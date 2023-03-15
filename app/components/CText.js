import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { theme } from '../redux/reducer/theme';
import { FontFamily } from '../config/typography';
const CText = React.forwardRef((props, ref) => {
  const {
    style = {},
    value = '',
    numberOfLines = null,
    isBold = false,
    size = 20,
    fontFamily = FontFamily.Poppins_Regular,
    color = theme().white,
    activeOpacity = 1,
    onPress = () => {},
    contStyle = {},
    ...rest
  } = props;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: size,
          fontWeight: isBold ? 'bold' : 'normal',
          fontFamily: fontFamily,
          color: color,
        },
        style,
      ]}
      {...rest}>
      {value}
    </Text>
  );
});

export default CText;