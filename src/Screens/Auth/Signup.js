import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Auth } from "aws-amplify";

export default ({ route, navigation }) => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput(route.params !== undefined ? route.params.email : "");
  const userNameInput = useInput("");
  const passwordInput = useInput("");

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: userName } = userNameInput;
    const { value: password } = passwordInput;

    await Auth.signUp({
      password: password,
      username: userName ,
      attributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
      }
    });
    
    navigation.dispatch(StackActions.replace("Confirm", { userName, password, fromLogin: false }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...firstNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...userNameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...passwordInput}
          placeholder="password"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <AuthButton onPress={handleSignup} text="Sign up" />
      </View>
    </TouchableWithoutFeedback>
  );
};