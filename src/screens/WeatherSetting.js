import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import Weather from './Weather';
import WeatherLoading from './WeatherLoading';
import * as Location from 'expo-location';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 

const API_KEY ="0378f839f05bd16fb2624b36317a1672";//날씨
const REST_API_KEY="605e4dd1010ecfb814b381ebf6fab6d8"; //카카오key

//naver key
//const X_NCP_APIGW_API_KEY_ID="b4ctzbcazx";
//const X_NCP_APIGW_API_KEY="SJ53Y5R3eN2OCO7ZVI6gTI96jOZjBQYSxrXoHLeT";

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

  getMountain=async(address,region,city,dong)=>{
    const payload={
      address_full : address,
      region : region,
      cityORgu : city,
      dongORmyun : dong 
    };
    fetch(`${API_URL}/main`,{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(async res =>{
      const jsonRes= await res.json();
      if(res.status==200){

      }

    }).catch(e=>{
      console.log(e);
    })

  }

  getLocation = async()=>{
    try {
      await Location.requestForegroundPermissionsAsync();

      
      const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync({accuracy : Location.Accuracy.Highest}); //현재 위도,경도,고도 받아오기
      this.getWeather(latitude, longitude);

      const lat=latitude;
      const lon=longitude;
     
      fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, { //kakao api
        method: 'GET',
        headers : {
          'Authorization' : `KakaoAK ${REST_API_KEY}`,
          'Content-Type': 'application/json',
          'charset':'UTF-8'
          
        }
    })
    .then(async(response)=>{
      const items = await response.json();

      if(response.status==200){
        if(items.meta.total_count!=0){
          const isMountain =items.documents[0].address.mountain_yn=="Y"?true:false;
          this.setState({
            isLoading: true,
            address_full : items.documents[0].address.address_name,
            region : items.documents[0].address.region_1depth_name,
            cityORgu : items.documents[0].address.region_2depth_name,
            dongORmyun : items.documents[0].address.region_3depth_name,
            isMountain : isMountain,
          }); 

          this.getMountain(this.state.address_full,
            this.state.region, 
            this.state.cityORgu,
            this.state.dongORmyun );
        }
        else{
          //위치를 잡을 수 없습니다.
        }
      }

     
    });
    
  
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