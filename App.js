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
          
        </SafeAreaView>
        )
    }
    
  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})