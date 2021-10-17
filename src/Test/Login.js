import React, { useState, useRef, useEffect, useContext } from 'react';
// import { Input, Button } from '../components';
import { Input } from '../components';
import { View, Text, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  // const { dispatch } = useContext(UserContext);
  // const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  // 이메일과 비번이 모두 정상적으로 입력되었다면 disabled 상태 변경
  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

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
    console.log("#@$##$@#$@#$")
  };

  return (
    
    <KeyboardAwareScrollView>
      <View insets={insets}>
  
        <Input
          label="Email"
          value={email}
          onChangeText={(_handleEmailChange)}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
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