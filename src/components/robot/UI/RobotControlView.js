import {View} from "react-native";
import React from "react";
import ArrowButton from "./ArrowButton";

class RobotControlView extends React.Component {

    render() {
        const {Forward, Left, Right, Reverse} = this.props

        return (
            <View style={{flex: 2, padding: 25}}>
                <View style={{flex: 2}}>
                    <ArrowButton Action={Forward} DirectionIcon={"md-arrow-up"} />
                </View>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <View style={{flex: 3}}>
                        <ArrowButton Action={Left} DirectionIcon={"md-arrow-back"}/>
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 3}}>
                        <ArrowButton Action={Right} DirectionIcon={"md-arrow-forward"}/>
                    </View>
                </View>
                <View style={{flex: 2}}>
                    <ArrowButton Action={Reverse} DirectionIcon={"md-arrow-down"}/>
                </View>
            </View>
        )
    }
}

export default RobotControlView