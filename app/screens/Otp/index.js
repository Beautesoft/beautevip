import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import { styledFunc } from './styles';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';
import CInput from '../../components/CInput';
import { Icons } from '../../config/icons';
import CButton from '../../components/CButton';
import { Images } from '../../config/images';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function Otp({ navigation, route }) {
  const styles = styledFunc();
  const { signupData } = useSelector((state) => state.auth);

  const type = route?.params?.type;
  const updatedData = route?.params?.updatedData;

  const [otp, setotp] = useState('');
  const [loader, setloader] = useState(false);
  const { clientDetails } = useSelector((state) => state.auth);
  const VerifyOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: signupData?.moNumber,
      otp: otp,
      referalCode: '',
    };

    getApiData(BaseSetting.endpoints.signUpOtpVerify, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 30 ~ .then ~ result', result);
        if (result?.success == 1) {
          navigation.navigate('AddProfileData');
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
      ...updatedData,
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Image
            source={{ uri: clientDetails?.clientLogo }}
            style={{
              height: 180,
              width: 180,
              marginTop: 102,
              alignSelf: 'center',
            }}
          />
          <View style={styles.container}>
            <CText
              value={t('otp')}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            <CText
              value={t('enterCode')}
              color={theme().yellow}
              size={14}
              fontFamily={FontFamily.Poppins_Regular}
            />
            <OTPInputView
              style={{
                width: '100%',
                height: 200,
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setotp(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={{
                width: 48,
                height: 48,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: theme().amber,
                color: theme().amber,
                fontSize: 14,
                fontFamily: FontFamily.Poppins_Medium,
              }}
              codeInputHighlightStyle={{}}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
            <CButton
              title={t('next')}
              style={styles.btnStyle}
              onPress={() => {
                if (type == 'update') {
                  updateProfile();
                } else {
                  VerifyOtp();
                }
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <CLoader loader={loader} />
    </>
  );
}
