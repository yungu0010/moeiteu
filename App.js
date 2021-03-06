import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigatorScreen from './src/navigations/MenuNavigation';
import Loading from './src/screens/Loading';
import AuthScreen from './src/screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

const API_KEY ="0378f839f05bd16fb2624b36317a1672";

export default class extends React.Component { //class로 바꾼모습
  state={
    isLoading:true
  };

  componentDidMount = async() => {
    // 1000 = 1s
    setTimeout(() => {this.setState({isLoading : false})}, 3000);
  }

  // getWeather = async(latitude, longitude) => {
  //   const {
  //     data: {
  //       main: { temp },
  //       weather
  //     }
  //   } = await axios.get(
  //     // 변수를 문자열에 포함시킬것이므로 ``이 필요함
  //     `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
  //   )
  //   this.setState({
  //     isLoading: false,
  //     condition: weather[0].main, // => 타입은 String임
  //     temp
  //   });
  // }

  // getLocation = async()=>{
  //   try {
  //     await Location.requestForegroundPermissionsAsync();
  //     const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync();
  //     this.getWeather(latitude, longitude);
  //     // 나중에 필요할수 있을것 같으니 변수에 lat, long, alt 저장하는 코드 추가하면 될듯
  //   } catch (error) {
  //     Alert.alert("Can't find you", "So sad");
  //   }

  // }

  // componentDidMount(){
  //   this.getLocation();
  // }

  render(){
    if(this.state.isLoading){
      return <Loading></Loading>
    }else{
      return (
        <SafeAreaView style={styles.safeAreaView}>
    
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Main" component={NavigatorScreen}  options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
          
        </SafeAreaView>)
    }
    // const { isLoading, temp, condition } = this.state;
    // return isLoading ? <WeatherLoading /> : 
    // (
    //   <Weather temp={Math.round(temp)} condition={condition} />
    // ); 
    // return(
    //   <Map></Map>
    // )

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})