import React, {useState, useEffect} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {View, StyleSheet, Dimensions} from 'react-native';
import Geolocation from "react-native-geolocation-service";
// MapView 사용을 위해 구글에 가서 API 키 만들고 사용어플 안드로이드 - 키제한: 구글 SDK MAP 주고
// app.json에다가 android에 패키지랑 config 추가
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Map = () => {
    // react-native-geolocation-service 모듈로 사용자의 현위치 가져올 것
    // https://dev-yakuza.posstree.com/ko/react-native/react-native-geolocation-service/
    // https://dev-yakuza.posstree.com/ko/react-native/react-native-maps/
  
    const [location, setLocation]=useState(
        [{ latitude: 37.5642135, 
            longitude: 127.0016985,
        }]
    );

    let watchId;

    useEffect(()=>{
        // watchPosition은 위치추적 요청의 고유 식별자 반환 clearWatch에 이값 넣으면 추적종료 가능
        // 인자는 3개로 success시, error시, option
        watchId = Geolocation.watchPosition(
            (position) => {
                const{latitude, longitude}=position.coords;
                setLocation([...location, {latitude, longitude}]);
            },
            (error)=>{console.log(error);},
            {
                // enableHighAccuracy:true, => 높은 정확도, 대신 느린응답과 전력소모율 증가
                distanceFilter:1,        // 최소 변화 미터
                interval:1000,           // active location 업뎃을 위한 interval
                fastestInterval:500,
            },
        );
    }, [location])

    // 언제 clear 해줄지 의문
    useEffect(() => {
        return () => {
            if(watchId!==null){
                Geolocation.clearWatch(watchId);
            }
        };
    },[])

    // onRegionChange는 지도에서 위치가 변경될경우 => 사용자의 위치변경을 반영하는게 아닌듯..
    return (
        <View style={styles.container}>
            {location.length>0 && (
                <MapView
                    style={styles.map}
                    // + 나중 customMapStyle 변경 json 파일 다운받는 법 알아보기 
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{ 
                        latitude: location[0].latitude, 
                        longitude: location[0].longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                <Marker
                    cordinate = {{
                        latitude: location[location.length-1].latitude,
                        longitude: location[location.length-1].longitude
                    }}
                    title="현위치"
                />
                </MapView>
            )}
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