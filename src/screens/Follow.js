import { NavigationHelpersContext } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 

// 로그인 후 이미 받아와져 있어야함
const myId = 2;

const Follow = () => {

    const [searchFlag, setSearchFlag] = useState(false); // 검색 버튼 눌렀는지 여부
    const [searchemail, setSearchEmail] = useState('');  // 검색시 입력하는 이메일
    const [followFlag, setFollowFlag] = useState(true);  // 팔로우중인지 언팔로우 중인지 여부
    const [findemail, setFindEmail] = useState('');      // 결과로 받은 이메일 (search랑 find 이멜 같을것)


    // !!!! 추가 : 자신의 계정일 경우 검색 불가.
    const searchFriend = () => {
        setSearchFlag(true);
        const inform = {searchemail, myId}
        // 보낸 응답에 대한 라우터 처리를 then 으로 기다림
        fetch(`${API_URL}/search`, {
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
                    setFollowFlag(jsonRes.follow);
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
        // 친구메일과 내 메일 (귀찮으면 다른데서 찾아서 주거나 로그인 시 id 줘서 그걸로 다 뿌리고 다니게)
        const inform = {searchemail, myId}
        fetch(`${API_URL}/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inform),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {  // 팔로우 했으므로 followFlag true
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
        const inform = {searchemail, myId}
        fetch(`${API_URL}/unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inform),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status == 200) {   // 언팔로우 했으므로 followFlag false
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
                    <View style={{ alignItems: 'center',justifyContent: 'center',}}><Text>NO RESULT</Text></View> 
                    : 
                    <View style={styles.friend}>
                        <Text style={styles.friendname}>{findemail}</Text>
                        <TouchableOpacity style={styles.fbutt} onPress={ !followFlag ? following : unfollowing }>
                                <Text style={{color:"white"}}>{ !followFlag ? 'FOLLOW' : 'UNFOLLOW' }</Text>
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
        top:height*0.15,
        height:height*0.5,
        width: width,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    friend:{
        width: width*0.9,
        height: height*0.05,
        margin:5,
        backgroundColor:"#F8F8DB",
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    friendname: {
        flex:8,
        fontSize:15,
        margin:5
    },
    fbutt: {
        flex:2,
        height:height*0.03,
        margin:5,
        backgroundColor:"gray",
        alignItems: 'center',
        justifyContent: 'center',
    }
    

});

export default Follow;