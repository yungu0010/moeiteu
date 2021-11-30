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
const API_KEY ="0378f839f05bd16fb2624b36317a1672";
const REST_API_KEY="605e4dd1010ecfb814b381ebf6fab6d8"; //카카오key
const mountainId=1
const myId=2
const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 

//naver key
//const X_NCP_APIGW_API_KEY_ID="b4ctzbcazx";
//const X_NCP_APIGW_API_KEY="SJ53Y5R3eN2OCO7ZVI6gTI96jOZjBQYSxrXoHLeT";

const weatherSetting = () => { 

  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({
    condition: "",
    temp:0
  })
  const [juso, setJuso]= useState({
    address_full : "",
    region : "",
    cityORgu : "",
    dongORmyun : "",
    isMountain : false,
  })
  const [mountainName, setMountainName] = useState("")
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  })
  const [mAltitude, setmAltitude] =useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [ratingOn, setRatingOn] = useState(false)

  // 산을 선택했을경우 그 산에 대한 고도 라우터에 요청해서 가져오기 => setmAltitude로 산 고도 지정해주기 mountaingId도 주기
  // 고도가 변할때마다 등산을 완료했는지 확인하는 코드
  // getLocation을 매번 해준다고 하면 그때마다 altitude가 변경되므로 그때마다 현재 고도와 산의 고도를 비교하는 코드 
  // 현재고도가 같거나 더 높다면 iscomplete를 true로 바꿔주고 요청을 보냄
  // badge 라우터에선 record 테이블에도 기록찍고 record 테이블은 등산 완료하기 할때마다 기록 (등산 종료시 종료버튼 있어야 최종고도 판단하고 종료할때 편할듯)

  useEffect(()=>{
    if(location.altitude>=mAltitude){  // 변수 색깔이상함;
      
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

  // getWeather(latitude, longitude); 어디서 호출할지 고민임
  const getMountain = async()=>{

    const payload={
      address_full : juso.address_full,
      region : juso.region,
      cityORgu : juso.cityORgu,
      dongORmyun : juso.dongORmyun, 
    };

    fetch(`${API_URL}/main`,{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),

    }).then(async (res) =>{
  
      const jsonRes= await res.json();
      if(res.status==200){
        if(jsonRes.length==1){ //주변에 산이 한개일 경우
          setMountainName(jsonRes[0].name)
        }
        else{ //주변 산이 여러개일 경우 : 리스트페이지 스택네비게이션으로 띄우기

        }

      }
      else if(res.status==404){
        console.log("이주변에 산이 없는걸 Front에 나타내도록 하자")
      }
    }).catch(e=>{ console.log(e);})

  }

  const getLocation = async()=>{
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude, altitude}} = await Location.getCurrentPositionAsync({accuracy : Location.Accuracy.Highest}); //현재 위도,경도,고도 받아오기
      setLocation({latitude, longitude, altitude});
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
          setJuso(
            {
                address_full : items.documents[0].address.address_name,
                region : items.documents[0].address.region_1depth_name,
                cityORgu : items.documents[0].address.region_2depth_name,
                dongORmyun : items.documents[0].address.region_3depth_name,
                isMountain : isMountain,
              }
          )

          console.log(`현재위치 : ${items.documents[0].address.address_name}`);
          
          //console.log(`getMountain 이후 : ${this.state.mountain_name}`);
          //this.getWeather(latitude, longitude);
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

  // 처음 딱 한번만 실행하면 되므로 어디서 할지 고려해보기
  // getMountain(
  //   items.documents[0].address.address_name,
  //   items.documents[0].address.region_1depth_name, 
  //   items.documents[0].address.region_2depth_name,
  //   items.documents[0].address.region_3depth_name,
  //   latitude,longitude);

  
  // 등산시 매번 getLocation 해야할텐데 조건을 어떻게 줄까? 시간 흐름으로 줄까? 뭐 1분에 한번씩 이렇게 
  useEffect(()=>getLocation,[])

  return(

    isLoading ? <WeatherLoading /> : 
    ( <View>
      <Weather temp={Math.round(temp)} condition={condition} />
      <Text>현재위치 : {address_full}</Text>
      <Text>주변에 있는 산 : {mountain_name}</Text>
      <Text>현재날씨 : {condition}</Text>
      </View>
    ) 
   
  )
}

export default weatherSetting ;