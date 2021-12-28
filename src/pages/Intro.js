import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cleanAsyncStorage} from "../config/config";

const data = [
    {
        title: 'Welcome to the controller of the robot',
        showTitle: true,
        titleColor: "rgb(222,220,220)",
        text: "In a few pages you are about to learn how to control the robot",
        textColor: "rgb(222,220,220)",
        image: require('../../assets/robot-min.png'),
        bg: 'rgba(109,111,169,0.9)',
    },
    {
        title: 'Thanks for your support',
        showTitle: true,
        titleColor: "rgba(109,111,169,1)",
        text: 'You can see all our products on the website',
        textColor: "rgb(123,122,122)",
        image: require('../../assets/support.png'),
        bg: '#ffd36c',
    },
    {
        title: 'Camera',
        showTitle: false,
        titleColor: "#3b3b3b",
        text: "the area in the top is commonly used to few what the robot is seeing. ",
        textColor: "rgb(222,220,220)",
        image: require('../../assets/video_light.png'),
        // image: null,
        bg: 'rgba(109,111,169,0.9)',
    },
    // {
    //   title: 'Move Arms',
    //   showTitle: true,
    //   titleColor: "rgb(243,243,243)",
    //   text: "There are two buttons, one for the left arm and one for the right. \n With the bend button you can bend over the robot",
    //   textColor: "white",
    //   // image: require('./assets/10808.jpg'),
    //   image: null,
    //   bg: '#22bcb5',
    // },
    {
        title: 'Movement',
        showTitle: true,
        titleColor: "rgba(109,111,169,1)",
        text: "use the lower buttons to ride the robot to left, right, forward and backwards",
        textColor: "rgb(123,122,122)",
        image: require('../../assets/movement.jpeg'),
        bg: '#ffd36c',
    },
];


const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        padding: 25,
    },
    image: {
        width: 280,
        height: 280,
        marginVertical: 32,
        resizeMode: 'contain',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontSize: 18
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
});

export default class Intro extends React.Component {
    state = {
        cleanAsyncStorage: cleanAsyncStorage
    }

    _renderItem = ({item: {bg, image, text, title, showTitle, titleColor, textColor}}) => {

        let renderImg = <View style={{height: 50}}/>
        if (image !== null) {
            renderImg = <Image source={image} style={styles.image}/>
        }

        let renderTitle = <View style={{height: 10}}/>
        if (showTitle) {
            renderTitle = <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
        }

        return (
            <View style={[styles.slide, {backgroundColor: bg},]}>
                {renderTitle}
                {renderImg}
                <Text style={[styles.text, {color: textColor}]}>{text}</Text>
            </View>
        );
    };

    _keyExtractor = (item) => item.title;

    _onDone = () => {
        AsyncStorage.setItem("@LoadApp", 'true')
        this.props.navigation.navigate("UserFormView")
    }

    componentDidMount() {
        this.skipIntroView()
    }

    async skipIntroView() {
        if (this.state.cleanAsyncStorage) {
            let keys  = await AsyncStorage.getAllKeys()
            for (let key of keys){
                await AsyncStorage.removeItem(key)
            }
        }

        let skipIntroView = await AsyncStorage.getItem('@LoadApp')
        if (skipIntroView) {
            this.props.navigation.navigate('UserFormView')
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent backgroundColor="transparent"/>
                <AppIntroSlider
                    showSkipButton={true}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onDone={this._onDone}
                    data={data}
                />
            </View>
        );
    }
}