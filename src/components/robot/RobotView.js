import React from 'react'
import {View} from "react-native";
import RobotControlView from "./UI/RobotControlView";
import RobotCameraView from "./UI/RobotCameraView";
import RobotMessageView from "./UI/RobotMessageView";

class RobotView extends React.Component {
    render() {
        const {
            CameraUrl,
            CurrentMessage,
            Forward,
            Left,
            Right,
            Reverse
        } = this.props

        return (
            <View style={{flex: 1, padding: 20, paddingTop: 0, flexDirection: "column"}}>
                <RobotCameraView CameraUrl={CameraUrl}/>
                <View style={{flex: 0}}/>
                <RobotMessageView CurrentMessage={CurrentMessage}/>
                <RobotControlView
                    Forward={Forward}
                    Left={Left}
                    Right={Right}
                    Reverse={Reverse}
                    {...this.props}
                />
            </View>
        );
    }
}

export default RobotView