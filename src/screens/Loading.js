import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { render } from 'react-dom';

const Loading = () => {
    return (
        <ImageBackground
        source={require('../img/Loading_sample.jpg')}
        style={{flex:1}}>
        </ImageBackground>   
    );
}

export default Loading;