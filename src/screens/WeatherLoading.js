import React from "react";
import { StyleSheet, Text, View,  StatusBar} from "react-native";


export default function WeatherLoading(){
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.text}>πλ μ¨ μ λ³΄ κ°μ Έμ€λ μ€β</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: "#FDF6AA"
    },
    text:{
        color: "#2c2c2c",
        fontSize: 30 
    }
});
