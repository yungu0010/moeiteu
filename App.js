import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView} from 'react-native';
import Weather from './src/screens/Weather';
import WeatherLoading from './src/screens/WeatherLoading';
import * as Location from 'expo-location';
import axios from 'axios';
import Signup from './src/Test/Signup'
import Login from './src/Test/Login'
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './Navigator';

const API_KEY ="0378f839f05bd16fb2624b36317a1672";

export default class extends React.Component { //class로 바꾼모습
  state={
    isLoading:true
  };

  getWeather = async(latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      // 변수를 문자열에 포함시킬것이므로 ``이 필요함
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
    this.setState({
      isLoading: false,
      condition: weather[0].main, // => 타입은 String임
      temp
    });
  }

  getLocation = async()=>{
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      // 나중에 필요할수 있을것 같으니 변수에 lat, long, alt 저장하는 코드 추가하면 될듯
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }

  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    // const { isLoading, temp, condition } = this.state;
    // return isLoading ? <WeatherLoading /> : 
    // (
    //   <Weather temp={Math.round(temp)} condition={condition} />
    // ); 
    return(
      <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Navigator/>
      </SafeAreaView>
      </SafeAreaProvider>
    )
  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})