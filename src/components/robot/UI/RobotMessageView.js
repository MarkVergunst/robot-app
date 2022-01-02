import {Text, View} from "react-native";
import React from "react";

class RobotMessageView extends React.Component {

    render() {
        const {CurrentMessage} = this.props

        if (CurrentMessage && CurrentMessage.length === 0) {
            return (
                <View style={{flex: 0, marginTop: 10, marginBottom: 10}}>
                    <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18}}>Last action: No actions
                        yet</Text>
                </View>
            )
        }

        return (
            <View style={{flex: 0, marginTop: 10, marginBottom: 10}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18}}>Last
                    action: {CurrentMessage}</Text>
            </View>
        )
    }
}

export default RobotMessageView