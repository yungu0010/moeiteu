import React,{useEffect, useState} from "react";
import { View, Text } from "react-native";
import Weather from '../../src/screens/Weather';
import WeatherLoading from '../../src/screens/WeatherLoading';

const WeatherScreen = ()=>{
    // state={
    //     isLoading:true
    //   };
    
    // getWeather = async(latitude, longitude) => {
    //     const {
    //       data: {
    //         main: { temp },
    //         weather
    //       }
    //     } = await axios.get(
    //       // 변수를 문자열에 포함시킬것이므로 ``이 필요함
    //       `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    //     )
    //     this.setState({
    //       isLoading: false,
    //       condition: weather[0].main, // => 타입은 String임
    //       temp
    //     });
    // }
    
    // getLocation = async()=>{
    //     try {
    //       await Location.requestForegroundPermissionsAsync();
    //       const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync();
    //       this.getWeather(latitude, longitude);
    //       // 나중에 필요할수 있을것 같으니 변수에 lat, long, alt 저장하는 코드 추가하면 될듯
    //     } catch (error) {
    //       Alert.alert("Can't find you", "So sad");
    //     }
    
    // } 여기 고쳐야됨
    //const { isLoading, temp, condition } = this.state;
    // return isLoading ? <WeatherLoading /> : 
    // (
    //     <Weather temp={Math.round(temp)} condition={condition} />
    // );
    return <View style={{marginTop:100}}><Text>날씨 받아온거</Text></View>

}


export default WeatherScreen;

