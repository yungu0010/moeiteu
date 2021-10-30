import React, { useState, forwardRef, useContext} from 'react';
//import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';

const SignupInput=forwardRef(
  (   
    {
      label,
      value, 
      onChangeText, 
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled
    }, 
  ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
   // console.log(`value : ${value}`);

    return(
      <View>
        <Text isFocused={isFocused}>{label}</Text>
        <TextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          editable={!disabled}
        />
      </View> 
    );
  }
);

SignupInput.defaultProps={
  onBlur: ()=>{},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

SignupInput.propTypes={
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing : PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType:PropTypes.oneOf(['done','next']),
  maxLength : PropTypes.number,
  disabled: PropTypes.bool,
};

export default SignupInput;