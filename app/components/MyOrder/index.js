import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import CButton from '../CButton';
import CText from '../CText';
import styles from './styles';
import moment from 'moment';

export default function OrderItem(props) {
  const { item, id, onPress = () => {} } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={{ borderRadius: 4, overflow: 'hidden', height: 90, width: 90 }}>
        <LinearGradient
          colors={['#806306', '#594000']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={styles.llCont}>
          <Image
            source={Icons.mail}
            style={{ height: '60%', width: '60%' }}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
      <View style={{ flex: 1, marginStart: 12 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 6,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <CText
              value={item?.subject}
              size={14}
              fontFamily={FontFamily.Poppins_SemiBold}
              color={theme().amber}
            />

            <View>
              <CText
                value={`Beautician`}
                size={10}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().white}
                style={{ marginTop: 8 }}
              />
              <CText
                value={item?.employeeName}
                size={10}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().amberTxt}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <CText
                value={`Location`}
                size={10}
                style={{ marginTop: 8 }}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().white}
              />
              <CText
                value={item?.location}
                size={10}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().amberTxt}
                style={{
                  textAlign: 'right',
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <CText
                value={`Status`}
                style={{ marginTop: 8 }}
                size={10}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().white}
              />
              <CText
                value={item?.apptStatus}
                size={10}
                fontFamily={FontFamily.Poppins_Regular}
                color={theme().amberTxt}
              />
            </View>
          </View>
        </View>
        {item?.apptStatus === 'Completed' && (
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <CButton
              title="Rate Service"
              style={{ height: 28, flex: 1, marginEnd: 6 }}
              titleStyle={{ color: theme().white, fontSize: 12 }}
            />
            <CButton
              title="Book Again"
              style={{ height: 28, flex: 1, marginStart: 6 }}
              titleStyle={{ color: theme().white, fontSize: 12 }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
