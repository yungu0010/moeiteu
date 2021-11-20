import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 

// 로그인 후 이미 받아와져 있어야함
const myId = 2;

const Rating = () => {
  return(
    <View>
      <Text>Rating</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  },
  map: {
  top: height*0.08,
  width: width*0.9,
  height: height*0.7,
  },
});


export default Rating;