import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import SignupInput from '../Test/Input';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(() => {
    let _errorMessage = '';
    if (!name) {
      _errorMessage = 'Please enter your name.';
    } else if (password.length < 6) {
      _errorMessage = 'The password must contain 6 characters at least.';
    } else if (password !== passwordConfirm) {
      _errorMessage = 'Passwords need to match';
    } else {
      _errorMessage = '';
    }
    setErrorMessage(_errorMessage);
  }, [name, email, password, passwordConfirm]);
  
  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm)
    );
    console.log(disabled);
  }, [name, email, password, passwordConfirm]
  );
  
  const _handleSignUpButtonPress = async() => {
    //여기서 state 값들을 DB로 이동해 계정만듬
    Alert.alert(`${name}님 환영합니다`); 
    Alert.alert(`name: ${name}, email: ${email},\npassword: ${password}, passwordConfirm: ${passwordConfirm}`);
  };
  
  return (
    <View style={{marginTop:50}} >
      <SignupInput
        label="Name"
        value={name}
        onChangeText={text => {setName(text); console.log(`text : ${text}`);}}
        onSubmitEditing={() => {
          setName(name.trim());
          emailRef.current.focus();
        }}
        onBlur={() => setName(name.trim())}
        placeholder="Name"
        returnKeyType="next"
      />
      <SignupInput
        ref={emailRef}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
        placeholder="Email"
        retrnKeyType="next"
      />
      <SignupInput
        ref={passwordRef}
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        onSubmitEditing={() => passwordConfirmRef.current.focus()}
        placeholder="Password"
        returnKeyType="done"
        isPassword
      />
      <SignupInput
        ref={passwordConfirmRef}
        label="Password Confirm"
        value={passwordConfirm}
        onChangeText={text => setPasswordConfirm(text)}
        onSubmitEditing={_handleSignUpButtonPress}
        placeholder="Password"
        returnKeyType="done"
        isPassword
      />
      <Button 
        title="Signup"
        onPress={_handleSignUpButtonPress}
        disabled={disabled}
      /> 
    </View>
  );
};


export default SignUp;