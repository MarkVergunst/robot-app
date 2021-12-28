import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import Colors from "../../../config/colors";

const style = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

class ArrowButton extends React.Component {

    render() {

        const {Action, DirectionIcon} = this.props

        return (
            <TouchableOpacity
                style={style.appButtonContainer}
                onPressIn={() => Action(true)}
                onPressOut={() => Action(false)}
            >
                <Text style={style.appButtonText}>
                    <Ionicons name={DirectionIcon} size={32} color="black"/>
                </Text>
            </TouchableOpacity>
        )
    }
}

export default ArrowButton