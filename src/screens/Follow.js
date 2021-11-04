import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { search } from '../../routes/user';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 


const Map = () => {
    

    const [searchFlag, setSearchFlag] = useState(false); // 검색 버튼 눌렀는지 여부
    const [searchemail, setSearchEmail] = useState('');
    const [followFlag, setFollowFlag] = useState(true);  // 팔로우중인지 언팔로우 중인지 여부
    const [findemail, setFindEmail] = useState('');

    const searchFriend = () => {

        setSearchFlag(true);
        const inform = {searchemail, mymail}

        // 보낸 응답에 대한 라우터 처리를 then 으로 기다림
        fetch(`${API_URL}/friend/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inform),
            // body는 {"searchemail":"yundabin0608@naver.com", mymail: "~~~"} 이런식.
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {         // 친구 찾으면 이메일 & 팔로우여부 지정
                    setFindEmail(jsonRes.email);
                    setFollowFlag(jsonRes.flag)
                } else if (res.status == 404){   // 친구 못찾으면 NO RESULT 화면
                    setSearchFlag(false)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });

    }

    const following = ()=> {
        // 팔로우 하는 알고리즘 -> 내이메일 또는 아이디와 친구이메일 보냄
        console.log("follow")
        
        // 친구메일과 내 ID
        const inform = {searchemail, mymail}

        fetch(`${API_URL}/friend/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inform),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {
                   setFollowFlag(true)
                } 
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    
    const unfollowing = ()=> {
        console.log("unfollow")

        const inform = {searchemail, mymail}

        fetch(`${API_URL}/friend/unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inform),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {
                   setFollowFlag(false)
                } 
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (

        <View style={styles.container}>
           <View style={styles.search}>
           <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setSearchEmail}></TextInput>
           <TouchableOpacity style={styles.button} onPress={searchFriend}>
                <Text>Search</Text>
            </TouchableOpacity>
           </View>
           <View style={styles.friendList}>
                { !searchFlag ? 
                    <View>NO RESULT</View> 
                    : 
                    <View style={styles.friend}>
                    <Text>{findemail}</Text>
                    <TouchableOpacity style={styles.button} onPress={ !followFlag ? following : unfollowing }>
                            <Text>{ !followFlag ? 'FOLLOW' : 'UNFOLLOW' }</Text>
                    </TouchableOpacity>
                </View>
                }
               
           </View>
            
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    search: {
        top:height*0.1,
        height:height*0.1,
        width: width,
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex:8,
        margin:10,
        borderWidth:1,
        borderColor: 'black',
        fontSize: 16, 
        height: height*0.05,
    },
    button:{
        flex:2,
        height: height*0.05,
        margin: 10,
        backgroundColor:'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    friendList: {
        flex:8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    friend:{
        width: width*0.9,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
    

});

export default Map;