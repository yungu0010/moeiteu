import React, {useState} from "react";
import {BottomNavigation} from "react-native-paper";
import Map from '../screens/Map';
import Main from "../screens/WeatherSetting";
import Follow from "../screens/Follow"
import Rating from '../screens/Rating'

export default function Navigator(){
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'scene1', title: 'Posting', icon: 'post'},
        {key: 'scene2', title: 'Ranking', icon: 'align-vertical-bottom'},
        {key: 'scene3', title: 'Home', icon: 'home'},
        {key: 'scene4', title: 'Map', icon: 'map-outline'},
        {key: 'scene5', title: 'Profile', icon: 'account-circle'}
    ]);
    const renderScene = BottomNavigation.SceneMap({
        // 여기 씬 있는데에 Test의 파일 넣으면 됨 Login, Signup 같은거 쓰면됨
        // 근데 Login, Signup넣으면 에러남
        scene1: Rating,
        scene2: Main,
        scene3: Main,
        scene4: Map,
        scene5: Follow,
});
    return <BottomNavigation navigationState={{index, routes}}
onIndexChange={setIndex} renderScene={renderScene}/>;
}