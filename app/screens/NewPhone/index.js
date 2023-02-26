import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import BaseSetting from '../../config/settings';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

export default function NewPhone({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const [loader, setloader] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [otp, setotp] = useState('');

  const sendOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: newNumber,
    };

    getApiData(BaseSetting.endpoints.sendOtp, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 23 ~ .then ~ result', result);
        if (result?.success == 1) {
          // navigation.navigate('NewPhone', {
          //   type: 'update',
          //   updatedData: updatedData,
          // });
        }
        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 25 ~ .then ~ err', err);
        setloader(false);
      });
  };

  const VerifyOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      otp: otp,
      referalCode: '',
    };

    getApiData(BaseSetting.endpoints.signUpOtpVerify, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 30 ~ .then ~ result', result);
        if (result?.success == 1) {
          navigation.navigate('NewPhone');
        } else {
          Toast.show('Wrong OTP!');
        }
        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 33 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        setloader(false);
      });
  };

  const updateProfile = () => {
    const data = {
      customerCode: userData?.customerCode,
      customerName: '',
      phoneNumber: newNumber,
      email: '',
      password: '',
      otp: otp,
    };
    console.log('🚀 ~ file: index.js ~ line 56 ~ updateProfile ~ data', data);

    getApiData(BaseSetting?.endpoints?.updateCustomerProfile, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 61 ~ .then ~ result', result);

        if (result?.success == 1) {
          // Toast.show(result?.result);
          console.log(
            '🚀 ~ file: index.js ~ line 68 ~ updateProfile  result~ ',
            result?.result,
          );
          navigation.navigate('Settings');
        }
      })
      .catch((err) => {
        navigation.navigate('Settings');
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
      });
  };

  return (
    <>
      <CHeader
        title={t('newPhone')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <CText
            value={t('addNewNum')}
            style={{ textAlign: 'center' }}
            size={14}
          />
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.dropCont} activeOpacity={0.7}>
              <Text style={styles.dropValue}>+61</Text>
              <Image
                tintColor={theme().darkAmber}
                style={{ height: 16, width: 16 }}
                resizeMode="center"
                source={Icons.drop_icon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={t('addNewNumHere')}
              placeholderTextColor={theme().darkAmber}
              style={styles.textInput}
              value={newNumber}
              onChangeText={setnewNumber}
            />
          </View>
          <View
            style={[
              styles.dropCont,
              {
                marginEnd: 0,
                marginTop: 16,
                height: null,
                alignItems: 'center',
              },
            ]}>
            <TextInput
              placeholder={t('enterOtpHere')}
              placeholderTextColor={theme().darkAmber}
              style={[styles.textInput, { borderWidth: 0, textAlign: 'left' }]}
              value={otp}
              onChangeText={setotp}
              keyboardType="numeric"
            />
            <CButton
              title={t('sendOtp')}
              style={{ width: '40%' }}
              onPress={() => {
                if (!isEmpty(newNumber)) {
                  sendOtp();
                } else {
                  Toast.show('Please enter New Number');
                }
              }}
            />
          </View>
        </View>
        <CButton
          title={t('update')}
          onPress={() => {
            updateProfile();
          }}
        />
      </View>
    </>
  );
}
