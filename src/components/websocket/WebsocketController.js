import {websocketUrl, socket, baseCameraUrl, productionBuild} from '../../config/config'
import React from "react";
import RobotView from "../robot/RobotView";
import {inject} from "mobx-react";
import RootStore from "../../models/RootStore";
import MessageViewModel from "../../models/domain/MessageViewModel";
import UserViewModel from "../../models/domain/UserViewModel";
import {isUUID} from "../../utils/uuid";

@inject(RootStore.type.MESSAGES_MODEL, RootStore.type.USER_MODEL)
class WebsocketController extends React.Component {
    reconnect;
    alreadyConnected = false

    state = {
        message: "",
        cameraUrl: undefined
    }

    static user_id;
    imageInterval;

    constructor(props) {
        super(props)
        this.connect();
        this.viewModel = new MessageViewModel(props[RootStore.type.MESSAGES_MODEL]);
        this.userViewModel = new UserViewModel(props[RootStore.type.USER_MODEL]);
        WebsocketController.user_id = this.userViewModel.getUserId()
        this.setInterval()
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    setInterval() {
        this.imageInterval = setInterval(() => {
            this.getCameraUrl();
        }, 200);
    }

    clearInterval() {
        clearInterval(this.imageInterval)
        clearInterval(this.reconnect)
    }

    getCameraUrl() {
        this.setState({cameraUrl: `${baseCameraUrl}?timestamp=${new Date().getTime()}`})
    }

    connect() {

        if (!this.alreadyConnected) {
            if (!productionBuild) {
                console.log(`Trying to setup connection to ${websocketUrl}`)
            }
            this.alreadyConnected = true
        }

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    "event": "connect",
                    "message": "App Gestart",
                    "id": this.userViewModel.getUserId()
                })
            );
            this.clearInterval();
        }

        socket.onmessage = (data) => this.messageHandler(data, "message", this)

        socket.onerror = (e) => this.messageHandler(e, "error", this)

        socket.onclose = () => {
            this.reconnect = setInterval(() => {
                this.connect()
            }, 2500);
        }
    }

    messageHandler(data, type, self) {
        if (type === "message") {
            try {
                let parsed_data = JSON.parse(data["data"]);
                let message = parsed_data['message'];
                let user_id = parsed_data['id'];
                this.setState({message: message});

                self.viewModel.addMessage(message, self.userViewModel.getUserById(user_id));

            } catch (e) {
                if (!productionBuild) {
                    console.log(e)
                }
            }
        } else {
            if (!productionBuild) {
                console.log(data)
            }
        }
    }

    forward(pressed) {
        let message = pressed ? "Start riding forward" : "Stopped riding forward";
        let data = {
            "event": "ride",
            "message": message,
            "action": "forward",
            "pressed": pressed,
            "id": WebsocketController.user_id
        }
        socket.send(JSON.stringify(data))
    }

    reverse(pressed) {
        let message = pressed ? "Start riding backward" : "Stopped riding backward";
        let data = {
            "event": "ride",
            "message": message,
            "action": "backward",
            "pressed": pressed,
            "id": WebsocketController.user_id
        }
        socket.send(JSON.stringify(data))
    }


    left(pressed) {
        let message = pressed ? "Start riding left" : "Stopped riding left";
        let data = {
            "event": "ride",
            "message": message,
            "action": "left",
            "pressed": pressed,
            "id": WebsocketController.user_id
        }
        socket.send(JSON.stringify(data))
    }

    right(pressed) {
        let message = pressed ? "Start riding right" : "Stopped riding right";

        let data = {
            "event": "ride",
            "message": message,
            "action": "right",
            "pressed": pressed,
            "id": WebsocketController.user_id
        }
        socket.send(JSON.stringify(data))
    }

    render() {

        return (
            <RobotView
                CameraUrl={this.state.cameraUrl}
                CurrentMessage={this.state.message}
                Forward={this.forward}
                Left={this.left}
                Right={this.right}
                Reverse={this.reverse}
            />
        )
    }
}

export default WebsocketController