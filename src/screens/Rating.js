import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'; 

const Rating = () => {
  const [userId, setUserId] = useState(1);  // 현재 session ID -> 나중에 받아오는 코드 추가하기
  const [mntId, setMntId] = useState(1);  // mountain ID -> 나중에 받아오는 코드 추가하기
  const [ascent, setAscent] = useState(true); // 완등 여부

  const [rateFac, setRateFac] = useState(0);  // facility 점수
  const [rateScene, setRateScene] = useState(0);  // scene 점수
  const [rateDiff, setRateDiff] = useState(0);  // difficulty 점수
  const [rateTotal, setRateTotal] = useState(0);  // 전체 평점 점수
  const [submit, setSubmit] = useState(false);  // 평점 제출 여부

  // 평점 제출 시
  const onSubmitHandler = () => {
    const rateState = { // 사용자 ID, 사용자가 입력한 평점
      userId,
      mntId,
      rateFac,
      rateScene,
      rateDiff,
    };
    
    fetch(`${API_URL}/rate`, { // 사용자 입력 -> DB
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rateState),
    })
    .then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status == 200) {  // DB -> 평균 계산
          console.log('200:', jsonRes);
          const fac = jsonRes.avgFac[0].avgFac;
          const scene = jsonRes.avgScene[0].avgScene;
          const diff = jsonRes.avgDiff[0].avgDiff;
          
          setRateFac(fac);
          setRateScene(scene);
          setRateDiff(diff);

          // 전체 평균 계산
          const avg = (fac + scene + diff) / 3;
          setRateTotal(avg.toFixed(2));

          // submit -> true
          setSubmit(true);
        } else {
          console.log('error:', jsonRes.message);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  // 전체 평점 컴포넌트
  const TotalRating = () => {
    return (
      <View>
        <Text>Total Rate</Text>
        <Text>facility: {rateFac}</Text>
        <Text>scene: {rateScene}</Text>
        <Text>difficulty: {rateDiff}</Text>
        <Text>Total: {rateTotal}</Text>
      </View>
    );
  };

  // 현재는 텍스트로 입력을 받지만 별점 드래그하는 방식으로 바꿀 예정
  // -> input에 제약조건 안 걸어도 됨. 단위는 0.5로 할 예정.
  return(
    <View style={styles.container}>
      <Text>Rating</Text>
      <View>
        <Text>facility</Text>
        <TextInput placeholder="5" onChangeText={setRateFac}></TextInput>
      </View>
      <View>
        <Text>scene</Text>
        <TextInput placeholder="5" onChangeText={setRateScene}></TextInput>
      </View>
      <View>
        <Text>difficulty</Text>
        <TextInput placeholder="5" onChangeText={setRateDiff}></TextInput>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onSubmitHandler}>
        <Text>Submit</Text>
      </TouchableOpacity>
      {submit ? <TotalRating/> : (<Text>평점을 입력하세요.</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: 'white',
  paddingTop: 100,
  },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Rating;