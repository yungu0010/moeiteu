import React, {useState} from 'react';
import {View, Platform, Text,SafeAreaView, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  Title, Caption, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { FlatList } from 'react-native-gesture-handler';


const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 
const userID=1; //suhwa@gmail.com/suhwa/suhwa1234 계정의 아이디로 일단 

// const Mypage = () => {


//     const renderItem=({item})=>{
//       return(
//         <View>
//            <Text>산이름: {item.mountainID}</Text>
//            <Text>rd: {item.RD}</Text>
//            <Text>rf: {item.RF}</Text>
//            <Text>rs: {item.RS}</Text>
//         </View>
//       );
//     };
      





const Mypage = () => {

    // 뱃지탭 다른거 보여줄 때 쓸 예정
    const [badgeTab, setBadgeTab] = useState(1);
    const[isgetbadge,setisget]=useState(false);
  
    const onSelectSwitch = value => {
      setBadgeTab(value);
    };

    let badges=new Array();
    
    const takeBadges=()=>{

      fetch(`${API_URL}/${userID}/badges`,
      {
        method : 'GET',
        headers : {
          'Content-Type': 'application/json',
        },
      })
      .then(async (res)=>{
        const jsonRes = await res.json();
        if(res.status==200){
          console.log(`응답 개수 : ${jsonRes.length}`);
          if(jsonRes.length==0){ 
            //뱃지 없다고 알리기, UI랑 합치고나서 해야할듯
          }
          else{ // 뱃지 있는거
            badges=jsonRes.map((bd)=> {
              let badge={ mountainID : bd.mountain_id, RD : bd.r_d, RF:bd.r_f, RS: bd.r_s};
              return badge;
           });

           badges.map(( bd,index)=>{
            console.log(`산이름 : ${bd.mountainID}`);
          });
           setisget(true);
          }
         
        }
        else if(res.status==404){
          console.log('404');
        }
        
      }).catch(e => {
          console.log(e);
      });  
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

      <View style={[styles.infoBoxWrapper, {height: 100}]}>
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

      <View style={styles.infoBoxWrapper}>
        <TouchableOpacity onPress={() => {takeBadges}}>
          <View style={styles.menuItem}>
            <Icon name="medal-outline" color="#224a3a" size={25}/>
            <Text style={styles.menuItemText}>뱃지</Text>
          </View>
          </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="human-greeting" color="#224a3a" size={25}/>
            <Text style={styles.menuItemText}>내가 팔로우 하는 사람</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-settings" color="#224a3a" size={25}/>
            <Text style={styles.menuItemText}>회원정보 수정(당장 필요한 기능은 아니라 넣을까말까 고민중)</Text>
          </View>
        </TouchableRipple>
      </View>
      {/* badge는 배열로 잘 들어오는데 렌더링시 문제 이를 해결 할 것
      isgetbadge ? 
       <View>
         <TouchableOpacity style={styles.button2} onPress={takeBadges}>
         <Text >내가 가지고 있는 뱃지들</Text> 
         </TouchableOpacity>
         <FlatList
         data={badges}
         renderItem={renderItem}/>
      
       </View>
       :
       <View>     
         <TouchableOpacity style={styles.button1} onPress={takeBadges}>
         <Text >내가 가지고 있는 뱃지들</Text> 
         </TouchableOpacity>    
       </View> */} 
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
