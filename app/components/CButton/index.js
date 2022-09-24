import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BaseColor from '../../config/colors';
import {FontFamily} from '../../config/typography';
import CText from '../CText';

export default function CButton(props) {
  const {
    style = {},
    title = 'Title',
    titleStyle = {},
    loader = false,
    onPress = () => {},
    ...rest
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          height: 56,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
      onPress={onPress}
      {...rest}>
      <LinearGradient
        colors={[BaseColor.yellow, BaseColor.amber]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loader ? (
          <ActivityIndicator size={'small'} color={BaseColor.black} />
        ) : (
          <CText
            value={title}
            style={[{color: BaseColor.black}, titleStyle]}
            fontFamily={FontFamily.Poppins_Regular}
            size={16}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
