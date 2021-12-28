import {Image, View} from "react-native";
import React from "react";

class RobotCameraView extends React.Component {

    render() {
        const {CameraUrl} = this.props;

        return (
            <View style={{flex: 3, marginTop: 30}}>
                <Image style={{width: '100%', height: '100%'}} source={{uri: CameraUrl}}/>
            </View>
        )
    }
}

export default RobotCameraView