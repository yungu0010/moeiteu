import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Mypage = () => {

    // 뱃지탭 다른거 보여줄 때 쓸 예정
    const [badgeTab, setBadgeTab] = useState(1);
  
    const onSelectSwitch = value => {
      setBadgeTab(value);
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
        <TouchableOpacity onPress={() => {}}>
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