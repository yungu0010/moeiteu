import React, {useState} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import react from 'react';
import * as Location from 'expo-location';
import { long } from 'webidl-conversions';

// MapView 사용을 위해 구글에 가서 API 키 만들고 사용어플 안드로이드 - 키제한: 구글 SDK MAP 주고
// app.json에다가 android에 패키지랑 config 추가
// react-native-maps 관련 API : https://github.com/react-native-maps/react-native-maps 

// 동적인 어플리케이션을 만드려면 다음을 사용하는게 코딩시 쉬울듯.
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
let Nlatitude, Nlongtitude

const Map =() => {

    /*async ()=>{
        await Location.requestForegroundPermissionsAsync();
        const {coords: {lat, lon, altitude}} = await Location.getCurrentPositionAsync({accuracy : Location.Accuracy.Highest});
    }*/

     //현재 위도,경도,고도 받아오기
    // 사실 초기값은 읽어온 위도 경도 넣어야 할 것. weathersetting.js에서 읽어온걸..? 넣도록.
    // 근데 사실 onRegionChange 때문에 안해도 될 것 같긴함
    // 사용자 위치추적도 가능함 하고싶다면 사용할 것.
    const [location, setLocation]=useState({
        latitude: 37.5642135, // Nlatitude로 바꿀것
        longitude:127.0016985,
        latitudeDelta: 0.1, // 얘네 늘이면 지도 확대율 지정됨
        longitudeDelta: 0.1,
    })

    console.log(location)
    
    
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // + 나중 customMapStyle 변경 json 파일 다운받는 법 알아보기 
                provider={PROVIDER_GOOGLE}
                initialRegion={location}
                onRegionChange={()=>{
                    setLocation({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    });
                }}
            >
            <Marker
                coordinate={location}
                title="현위치"
            />
            </MapView>
        </View>
    )
}
    
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

export default Map;