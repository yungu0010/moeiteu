import React, { useState, useRef, useEffect, useContext } from 'react';
// import { Input, Button } from '../components';
import { Input } from '../components';
import { View, Text, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  // const { dispatch } = useContext(UserContext);
  // const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  // 이메일과 비번이 모두 정상적으로 입력되었다면 disabled 상태 변경
  useEffect(() => {
    setDisabled(!(Email && Password && !errorMessage));
  }, [Email, Password, errorMessage]);

  // 이메일 입력시 바꿀때 쓰는것. 
  // 입력값에서 공백제거한 후 유효성 체크해서 에러메세지 지정해줌
  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  
  // 비밀번호 입력시 바꿀때 쓰는것. 공백만 제거
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  // 버튼이 눌렸을때
  const _handleLoginButtonPress = async() => {
    // https://aboutreact.com/react-native-login-and-signup/ 참고

    setErrorMessage('');
    let dataToSend = {email: Email, password: Password};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  




  return (
    <KeyboardAwareScrollView>
      <View style={{marginTop:50}} insets={insets}>
  
        <Input
          label="Email"
          value={Email}
          onChangeText={(_handleEmailChange)}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={Password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Text>{errorMessage}</Text>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;