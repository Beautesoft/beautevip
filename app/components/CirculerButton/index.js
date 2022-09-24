import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import CText from '../CText';
import styles from './styles';

export default function CircularButton(props) {
  const {
    iconSrouce = Icons.mail,
    title = 'Title',
    style = {},
    circleStyle = {},
    onPress = () => {},
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.rootCont, style]}
      onPress={onPress}>
      <View style={[styles.llCont, circleStyle]}>
        <LinearGradient
          colors={['#806306', '#594000']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={iconSrouce}
            style={{ height: '50%', width: '50%' }}
            resizeMode="center"
            tintColor={BaseColor.black}
          />
        </LinearGradient>
      </View>
      <CText
        value={title}
        size={14}
        fontFamily={FontFamily.Poppins_Medium}
        color={BaseColor.amberTxt}
        style={styles?.titleSty}
      />
    </TouchableOpacity>
  );
}
