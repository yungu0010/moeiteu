
//왜 이파일만 추가하면 오류가 나는걸까?
/*import React,{useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {  Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { response } from 'express';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 


const Mypage = () => {

    // 뱃지탭 다른거 보여줄 때 쓸 예정
    const [badgeTab, setBadgeTab] = useState(1);

    const[badges,setBadges]=useState();//결과로 받은 뱃지들

    const userID=1 //suhwa@gmail.com/suhwa/suhwa1234 계정의 아이디로 일단 박아둠
  
    const onSelectSwitch = value => {
      setBadgeTab(value);
    };
  
    const takeBadges=()=>{

      console.log("이벤트 클릭\n");

      fetch(`${API_URL}/${userID}/badges`,
      {
        method : 'GET',
        headers : {
          'Content-Type': 'application/json',
        },
      })
      .then(async (res)=>{
        console.log("res옴??");
        const jsonRes = await res.json();
        if(res.status==200){
          console.log(jsonRes.messaage);
        }
        else if(res.status==404){
          console.log(jsonRes.ratingArray);
        }
        

      }).catch();
      
    };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image 
        //   Userprofile 사진
            source={{
              uri: "https://source.unsplash.com/random/1000x800"
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Username</Title>
            <Caption style={styles.caption}>Username</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>email</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>192km</Title>
            <Caption>total_altitude</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>3</Title>
            <Caption>Ranking</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="human-greeting" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>내가 팔로우 하는 사람</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={takeBadges}>
          <View style={styles.menuItem}>
            <Icon name="human-greeting" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>내가 가지고 있는 뱃지들</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-settings" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>회원정보 수정(당장 필요한 기능은 아니라 넣을까말까 고민중)</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default Mypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
*/