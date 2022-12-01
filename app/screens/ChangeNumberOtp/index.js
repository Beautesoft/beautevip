import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { TextInput, View, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CLoader from '../../components/CLoader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import { styledFunc } from './styles';
import { theme } from '../../redux/reducer/theme';

export default function ChangeNumberOtp({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [loader, setloader] = useState(false);
  const [otp, setotp] = useState('');

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    sendOtp();
  }, []);

  const sendOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
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

  return (
    <>
      <CHeader
        title={t('changePhone')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <CText
            value={t('pleaseEnterOtpCurNum')}
            style={{ textAlign: 'center' }}
            size={14}
          />
          <CText
            value={`${t('number')} ${userData?.customerPhone}`}
            style={{ textAlign: 'center' }}
            size={14}
          />
          <TextInput
            placeholder={t('enterHere')}
            placeholderTextColor={theme().darkAmber}
            style={styles.textInput}
            value={otp}
            onChangeText={setotp}
            keyboardType="numeric"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              sendOtp();
            }}>
            <CText
              value={t('resend')}
              style={{ textAlign: 'center', marginTop: 16 }}
              size={14}
              color={theme().amberTxt}
              activeOpacity={0.7}
            />
          </TouchableOpacity>
        </View>
        <CButton title={t('next')} onPress={() => VerifyOtp()} />
      </View>
      <CLoader loader={loader} />
    </>
  );
}
