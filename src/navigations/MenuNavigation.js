import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import Map from '../screens/Map';
import Main from "../screens/WeatherSetting";
import Follow from "../screens/Follow"
import Rating from '../screens/Rating'

const Tab = createBottomTabNavigator();

// component에 맞는 페이지 알아서 넣어주심 됩니당
export default function Navigator(){
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarActiveTintColor: '#9bbb7a',}}>
            <Tab.Screen
                name="Posting"
                component={Rating}
                options={{
                tabBarLabel: 'ranking',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="post-outline" color={color} size={size} />
                ),
                }}
            />
            <Tab.Screen
                name="Ranking"
                component={Rating}
                options={{
                tabBarLabel: 'ranking',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Main}
                options={{
                tabBarLabel: 'home',
                tabBarIcon: ({ color, size }) => (
                    <FoundationIcons name="mountains" color={color} size={size} />
                ),
                //tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                tabBarLabel: 'map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-marker-circle" color={color} size={size} />
                ),
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={Follow}
                options={{
                tabBarLabel: 'mypage',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                ),
                }}
            />
        </Tab.Navigator>
    )
}