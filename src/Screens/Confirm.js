import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";

export default ({ route, navigation }) => {
  const confirmInput = useInput("");
  const { userName, password, fromLogin } = route.params;

  const handleConfirm = async () => {
    const { value } = confirmInput;
    
    await Auth.confirmSignUp(userName, value);      //userName과 인증코드만 담아서 실행
    Alert.alert("인증이 완료되었습니다.");
    //navigation.goBack 메소드는 매개변수 전달할 수 없기 때문에, 뒤에 있는 Login스크린에 userName과 패스워드 전달이 어려움 -> navigate메소드 사용
    navigation.navigate("Login", {userName: userName, password: password, updateRequired: !fromLogin});
  }

  const resendConfirmationCode = async (userName) => {      //인증코드 재전송
    await Auth.resendSignUp(userName);
    Alert.alert("인증 코드를 다시 전송했습니다.");
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm"/>
        <TouchableOpacity onPress={() => resendConfirmationCode(userName)}>
          <Text style={{color: styles.blueColor}}>인증코드 재전송</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};