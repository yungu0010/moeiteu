import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import Weather from './Weather';
import WeatherLoading from './WeatherLoading';
import * as Location from 'expo-location';
import axios from 'axios';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 
const API_KEY =''
const mountainId=1
const myId=2

const weatherSetting = () => { 
  
  const [state, setState] = useState({ isLoading:true})
  const [altitude, setAltitude] = useState(0)
  const [mAltitude, setmAltitude] =useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [ratingOn, setRatingOn] = useState(false)

  // 산을 선택했을경우 그 산에 대한 고도 라우터에 요청해서 가져오기 => setmAltitude로 산 고도 지정해주기 mountaingId도 주기

  // 고도가 변할때마다 등산을 완료했는지 확인하는 코드
  // getLocation을 매번 해준다고 하면 그때마다 altitude가 변경되므로 그때마다 현재 고도와 산의 고도를 비교하는 코드 
  // 현재고도가 같거나 더 높다면 iscomplete를 true로 바꿔주고 요청을 보냄
  // badge 라우터에선 record 테이블에도 기록찍고 record 테이블은 등산 완료하기 할때마다 기록 (등산 종료시 종료버튼 있어야 최종고도 판단하고 종료할때 편할듯)

  useEffect(()=>{
    if(altitude>=mAltitude){
      
      setIsComplete(true);
      setAltitude(mAltitude);
      setRatingOn(true);    // 평가 가능하도록하기

      const inform = {myId:myId, mountainId:mountainId, altitude:altitude};
      fetch(`${API_URL}/badge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inform),
      })
      .then(async res => { 
          try {
              const jsonRes = await res.json();
              if (res.status == 200) {// 요청완료
                  console.log("badge 기록 완료")
              } else{   
                  console.log("badge 기록 실패")
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }
  }, [altitude])


  const getWeather = async(latitude, longitude) => {
    console.log("!!")
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      // 변수를 문자열에 포함시킬것이므로 ``이 필요함
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
    setState({
      isLoading: false,
      condition: weather[0].main, // data.weather[0].main ???
      temp
    });
  }

  const getLocation = async()=>{
    try {
      await Location.requestForegroundPermissionsAsync();
      console.log("1")
      const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude, altitude)
      console.log("2")
      setAltitude(altitude) // 고도저장
      console.log("3")
      getWeather(latitude, longitude);
     
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }

  }

  // 등산시 매번 getLocation 해야할텐데 조건을 어떻게 줄까? 시간 흐름으로 줄까? 뭐 1분에 한번씩 이렇게 
  useEffect(()=>getLocation,[])

  return state.isLoading ? <WeatherLoading /> : 
  (
    <Weather temp={Math.round(temp)} condition={condition} />
  ); 
  

};

export default weatherSetting;