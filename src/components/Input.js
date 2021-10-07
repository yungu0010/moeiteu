import React, { useState, forwardRef } from 'react';
import { View , Text, TextInput} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';


// 아이디와 비밀번호 입력받도록함
const Input = forwardRef(
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
      disabled,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
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
          textContentType="none" // iOS only
          underlineColorAndroid="transparent" // Android only
          editable={!disabled}
        />
      </View>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Input;
