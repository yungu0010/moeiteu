import React,{useEffect, useState} from "react";
import { View } from "react-native";

const temp = ()=>{
    const [bcolor, setBcolor]= useState('#FFFFFF');
    useEffect(()=>{
        const id = setInterval(()=>{
            setBcolor("#"+ Math.floor(Math.random()*10**7).toString(16));
        },1000);
        
        return ()=>{clearInterval(id)};
    },[]);
    return <View style={{flex:1, backgroundColor:bcolor}}></View>
    // 변수지만 {} 이렇게 ${} 이런 괄호쓰지말기..

}


export default temp