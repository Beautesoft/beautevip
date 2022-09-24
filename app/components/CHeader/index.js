import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import BaseColor from '../../config/colors';
import {Icons} from '../../config/icons';
import CText from '../CText';

export default function CHeader(props) {
  const {
    title = 'Title',
    leftIcon = Icons.back_arrow,
    showLeftIcon,
    onLeftIconPress = () => {},
  } = props;
  return (
    <View
      style={{
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: BaseColor.amber,
        padding: 16,
        paddingBottom: 32,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <CText value={title} size={32} color={BaseColor.darkGrey} />
        {showLeftIcon && (
          <TouchableOpacity onPress={onLeftIconPress} activeOpacity={0.7}>
            <Image
              source={leftIcon}
              tintColor={BaseColor.darkGrey}
              style={{height: 34, width: 34}}
              resizeMode="center"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
