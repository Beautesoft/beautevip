import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import CText from '../CText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
export default function CHeader(props) {
  const {
    title = 'Title',
    leftIcon = Icons.back_arrow,
    cartIcon = Icons.cart,
    bookingIcon = Icons.booking_plus_icon,
    showLeftIcon,
    onLeftIconPress = () => { },
    onCartIconPress = () => { },
    leftFisrtIcon = Icons.home,
    showLeftFirstIcon,
    showCartIcon,
    onLeftFirstIconPress = () => { },
    showBookingIcon,
    onBookingIconPress = () => { },
  } = props;
  const { clientDetails } = useSelector((state) => state.auth);
  return (
    <View
      style={{
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: theme().amber,
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
        <CText
          value={
            title.length < 15 ? `${title}` : `${title.substring(0, 15)}...`
          }
          size={23}
          color={theme().darkGrey}
        />
        {showLeftFirstIcon && (
          <TouchableOpacity onPress={onLeftFirstIconPress} activeOpacity={0.7}>
            {/* <Image
              source={leftFisrtIcon}
              style={{ height: 34, width: 34, tintColor: theme().darkGrey }}
              resizeMode="center"
            /> */}
            <MaterialIcons name="home" size={35} color={theme().darkGrey} />
          </TouchableOpacity>
        )}
        {(showCartIcon && clientDetails?.isEnableAddtoCart == "Yes") && (
          <TouchableOpacity onPress={onCartIconPress} activeOpacity={0.7}>
            <Image
              source={cartIcon}
              style={{ height: 34, width: 34, tintColor: theme().darkGrey }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {showLeftIcon && (
          <TouchableOpacity onPress={onLeftIconPress} activeOpacity={0.7}>
            <Image
              source={leftIcon}
              style={{ height: 34, width: 34, tintColor: theme().darkGrey }}
              resizeMode="center"
            />
          </TouchableOpacity>
        )}
        {showBookingIcon && (
          <TouchableOpacity onPress={onBookingIconPress} activeOpacity={0.7}>
            <Image
              source={bookingIcon}
              style={{ height: 34, width: 34, tintColor: theme().darkGrey }}
              resizeMode="center"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
