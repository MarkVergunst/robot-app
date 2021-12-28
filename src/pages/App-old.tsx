import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet, ScrollView, Image
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#d0cdcd",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

// Start settings //
// const backendServer = "141.252.231.194:8010" // school ip
const backendServer = "192.168.178.16:8010" // thuis ip
// const backendServer = "butter-robot-mv.herokuapp.com" // server adress
// const imageAddress = "192.168.178.16:8010/static" // local adress
const imageAddress = "robot-bucket-r-m.s3.amazonaws.com/media" // server adress
const protocol = 'https'
const wsProtocol = 'ws'
// End settings //


export default class App extends React.Component {
  public reconnect: any;
  public imageID: any;
  private wsUrl: string = `${wsProtocol}://${backendServer}/ws/test1/`;
  private baseCameraUrl: string = `${protocol}://${imageAddress}/capture.bmp`;

  public socket: any = new WebSocket(this.wsUrl);

  state = {
    message: "Geen bericht nog verstuurd",
    camera_url: this.baseCameraUrl
  }

  constructor(props: any) {
    super(props);
    this.connect()
  }

  componentDidMount() {
    this.imageID = setInterval(() => {
      this.reloadIMG();
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.imageID);
    clearInterval(this.reconnect);
  }

  reloadIMG() {
    this.setState({camera_url: `${this.baseCameraUrl}?timestamp=` + Math.random()});
  }

  connect() {
    console.log(`Trying to setup connection to ${this.wsUrl}`)
    let tmp_data = {
      "event": "connect",
      "message": "App gestart"
    }
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify(tmp_data));
      clearInterval(this.reconnect);
    }

    // @ts-ignore
    this.socket.onmessage = ({data}) => {
      try {
        let parsed_data = JSON.parse(data)
        console.log(parsed_data)
      } catch (e) {
        console.log(e)
      }

    }
    this.socket.onerror = (e: any) => {
      console.log('error', e)
    }

    this.socket.onclose = () => {
      this.reconnect = setInterval(() => {
        this.connect()
      }, 2500);
    }
  }

  forward(pressed: boolean) {
    let message = pressed ? "Start riding forward" : "Stopped riding forward";
    let data = {
      "event": "ride",
      "message": message,
      "action": "forward",
      "pressed": pressed
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }

  reverse(pressed: boolean) {
    let message = pressed ? "Start riding backward" : "Stopped riding backward";
    let data = {
      "event": "ride",
      "message": message,
      "action": "backward",
      "pressed": pressed
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }


  left(pressed: boolean) {
    let message = pressed ? "Start riding left" : "Stopped riding left";
    let data = {
      "event": "ride",
      "message": message,
      "action": "left",
      "pressed": pressed
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }

  right(pressed: boolean) {
    let message = pressed ? "Start riding right" : "Stopped riding right";

    let data = {
      "event": "ride",
      "message": message,
      "action": "right",
      "pressed": pressed
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }

  bend(pressed: boolean) {
    let message = pressed ? "Start bending" : "Stopped bending";

    let data = {
      "event": "bend",
      "message": message,
      "action": "",
      "pressed": pressed
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }

  arm(pressed: boolean, which: string) {
    let message = pressed ? `Start raising ${which} arm` : `Stopped raising ${which} arm`;
    let data = {
      "event": "",
      "message": message,
      "action": "right",
      "pressed": pressed
    }
    if (which === "left") {
      data["event"] = "left_arm"
    }
    if (which === "right") {
      data["event"] = "right_arm"
    }
    this.setState({message: message});
    this.socket.send(JSON.stringify(data))
  }

  render() {
    const screenHeight = Math.round(Dimensions.get('window').height);

    return (
        <View style={[style.container, {
          flexDirection: "column",
          height: screenHeight
        }]}>
          <View style={{flex: 0}}/>
          <View style={{flex: 3, marginTop: 30,}}>
            <Image style={{width: '100%', height: '100%'}} source={{uri: this.state.camera_url}}/>
          </View>
          <View style={{flex: 0, marginTop: 10, marginBottom: 10}}>
            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18}}>Current
              action: {this.state.message}</Text>
          </View>
          <View style={{flex: 2, padding: 25}}>
            <View style={{flex: 2}}>
              <TouchableOpacity
                  style={style.appButtonContainer}
                  onPressIn={() => {
                    this.forward(true)
                  }}
                  onPressOut={() => {
                    this.forward(false)
                  }}
              >
                <Text style={style.appButtonText}>
                  <Ionicons name="md-arrow-up" size={32} color="black"/>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 2, flexDirection: "row"}}>
              <View style={{flex: 3}}>
                <TouchableOpacity
                    style={style.appButtonContainer}
                    onPressIn={() => {
                      this.left(true)
                    }}
                    onPressOut={() => {
                      this.left(false)
                    }}
                >
                  <Text style={style.appButtonText}>
                    <Ionicons name="md-arrow-back" size={32} color="black"/>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}/>
              <View style={{flex: 3}}>
                <TouchableOpacity
                    style={style.appButtonContainer}
                    onPressIn={() => {
                      this.right(true)
                    }}
                    onPressOut={() => {
                      this.right(false)
                    }}
                >
                  <Text style={style.appButtonText}>
                    <Ionicons name="md-arrow-forward" size={32} color="black"/>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 2}}>
              <TouchableOpacity
                  style={style.appButtonContainer}
                  onPressIn={() => {
                    this.reverse(true)
                  }}
                  onPressOut={() => {
                    this.reverse(false)
                  }}
              >
                <Text style={style.appButtonText}>
                  <Ionicons name="md-arrow-down" size={32} color="black"/>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}