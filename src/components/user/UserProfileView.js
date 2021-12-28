import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Colors from "../../config/colors";

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        marginBottom: 0,
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 0,
        borderColor: Colors.brandPrimary,
        fontSize: 17,
        backgroundColor: Colors.white
    },
    inputErrorText: {
        paddingLeft: 12,
        paddingTop: 2,
        color: Colors.red
    },
    buttonContainer: {
        margin: 20,
        elevation: 8,
        backgroundColor: Colors.brandPrimary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    saveButton: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: "bold",
        alignSelf: "center",
    }
});

class UserProfileView extends React.Component {

    render() {

        const {
            SetUsername, Username, SaveUsername, UsernameValidationText
        } = this.props

        return (
            <View style={{flex: 1}}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => SetUsername(text)}
                    value={Username}
                    placeholder="Enter your name"
                />
                <Text style={styles.inputErrorText}>{UsernameValidationText}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={SaveUsername}
                >
                    <Text style={styles.saveButton}>
                        Save profile
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default UserProfileView