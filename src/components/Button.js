import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View,Text } from 'react-native';

const TRANSPARENT = 'transparent';


const Button = ({ containerStyle, title, onPress, isFilled, disabled }) => {
  return (
    <View
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled} // isFilled로 버튼 내부를 채우거나 투명하게 처리. 기본은 색이 채워진상태
      disabled={disabled} // 이멜과 비번 모두 입력시 버튼이 클릭되게 하려고 추가
    >
      <Text isFilled={isFilled}>{title}</Text>
    </View>
  );
};

Button.defaultProps = {
  isFilled: true,
};

Button.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;