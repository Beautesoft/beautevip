import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import { FontFamily } from '../../config/typography';
import CText from '../CText';

export default function ProductContainer(props) {
  const {
    name = 'Name',
    price = 10.0,
    onPress = () => {},
    image = Images.sampleOne,
    style = {},
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {
          backgroundColor: theme().white,
          borderRadius: 10,
          overflow: 'hidden',
        },
        style,
      ]}>
      <Image
        source={image}
        style={{ height: 180, width: '100%' }}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 6,
        }}>
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <CText
            value={name}
            style={{ width: '100%' }}
            numberOfLines={1}
            color={theme().black}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
          <CText
            value={`Price: $${price}`}
            color={'#806306'}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            height: 24,
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#806306',
            borderRadius: 4,
            marginHorizontal: 8,
          }}>
          <Image
            source={Icons.cart}
            style={{ height: '50%', width: '50%' }}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
