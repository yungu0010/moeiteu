import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import Weather from './Weather';
import WeatherLoading from './WeatherLoading';
import * as Location from 'expo-location';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const API_KEY ="0378f839f05bd16fb2624b36317a1672";
const REST_API_KEY="605e4dd1010ecfb814b381ebf6fab6d8";

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
      const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync(); //현재 위도,경도,고도 받아오기
      console.log(`위도 : ${latitude}, 경도 : ${longitude}, 고도 : ${altitude}`);
    




      //카카오는 안되늰것같은데 왜 안되지? 구글이랑 네이버로 시도해보고싶은데 구글이랑 네이버는 결제카드등록해야함 
      
      /*
      const { kakaodata:{
        documents : {
          address,
          road_address
        }
      } } = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
        headers: {
            Authorization : `KakaoAK ${REST_API_KEY}`
        }
    });
    console.log(`kakao`);
    console.log(kakaodata.documents.address);
      */
      fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
        method: 'GET',
        headers : {
          'Authorization' : `KakaoAK ${REST_API_KEY}`,
          'Content-Type': 'application/json',
          'charset':'UTF-8'
          
        }
    })
    .then((response)=>{
      console.log("anser");
      //const items =JSON.parse(response.json);
      //const items =JSON.parse(JSON.stringify(response));
      const items =response.json;

      console.log("res");
      console.log(items);
      
      //console.log(items._bodyInit._data);
      //const iteminit=_bodyInit._data;
    });
    






/*
      console.log("1");
      const { kakaodata } = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });
    console.log("2");
    console.log(kakaodata);
    const jsdata=JSON.parse(kakaodata);
    console.log("3");

      if(jsdata){
        console.log(`${jsdata.meta.total_count}`);
      }
     
      console.log("4");*/



      //if(kakaodata[0]){console.log(`address_name : ${kakaodata[0].address.address_name}`);}
      //else{}                          
      //this.getMountain();
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
    const { isLoading, temp, condition } = this.state;
    //const { isLoading, temp, condition, mountain } = this.state;
    return isLoading ? <WeatherLoading /> : 
    ( <Weather temp={Math.round(temp)} condition={condition} />
    ); 
   
  }

};