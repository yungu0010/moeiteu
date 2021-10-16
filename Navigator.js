import { number } from "prop-types";
import React, {useState} from "react";
import {BottomNavigation} from "react-native-paper";
import Login from './src/Test/Login';
import Signup from './src/Test/Signup';
import temp from './src/Test/temp';
import WeatherScreen from "./src/Test/WeatherScreen";

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
        scene1: Signup,
        scene2: Login,
        scene3: WeatherScreen,
        scene4: temp,
        scene5: temp,
});
    return <BottomNavigation navigationState={{index, routes}}
onIndexChange={setIndex} renderScene={renderScene}/>;
}