import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import CText from '../CText';

export default function CInput(props) {
  const {
    value = '',
    contStyle = {},
    style = {},
    showLeftIcon,
    showRightIcon,
    leftIcon = Icons.mobile_alt,
    rightIcon = Icons.eye_close,
    placeholderTextColor = theme().placeholderTextColor,
    onRightIconPress = () => {},
    photoPicker,
    photoSource,
    onPhotoPicker = () => {},
    ...rest
  } = props;
  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme().transparent,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: theme().amberTxt,
            alignItems: 'center',
            paddingHorizontal: 8,
          },
          contStyle,
        ]}>
        {showLeftIcon && (
          <Image
            source={leftIcon}
            style={{
              height: 22,
              width: 22,
              marginBottom: photoPicker ? 12 : null,
            }}
            resizeMode="contain"
          />
        )}
        {photoPicker ? (
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', height: 40 }}
            activeOpacity={0.7}
            onPress={onPhotoPicker}>
            <CText
              value={photoSource ? 'Profile Picture' : 'Add Profile Picture'}
              color={photoSource ? theme().amber : theme().placeholderTextColor}
              size={14}
              style={{
                height: 40,
                marginStart: 16,
                textAlignVertical: 'center',
              }}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            {...rest}
            value={value}
            style={[
              {
                marginLeft: 16,
                flex: 1,
                color: theme().amberTxt,
                fontFamily: FontFamily.Poppins_Medium,
                marginTop: 10,
              },
              style,
            ]}
            placeholderTextColor={placeholderTextColor}
            {...rest}
          />
        )}

        {showRightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightIconPress}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              overflow: 'hidden',
            }}>
            <Image
              source={photoSource ? { uri: photoSource } : rightIcon}
              style={{
                height: photoSource ? 32 : 22,
                width: photoSource ? 32 : 22,
                borderRadius: photoSource ? 20 : 0,
                borderWidth: photoSource ? 1 : 0,
                borderColor: theme().amber,
              }}
              resizeMode={photoSource ? 'cover' : 'contain'}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
