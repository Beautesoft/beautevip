import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import { styledFunc } from './styles';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';
import CInput from '../../components/CInput';
import { Icons } from '../../config/icons';
import CButton from '../../components/CButton';
import { Images } from '../../config/images';
import _, { isEmpty } from 'lodash';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import Toast from 'react-native-simple-toast';
import CLoader from '../../components/CLoader';
import { t } from 'i18next';
import validator from 'validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUp({ navigation }) {
  const styles = styledFunc();
  const [moNumber, setmoNumber] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [promoCode, setpromoCode] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const { clientDetails } = useSelector((state) => state.auth);
  const [loader, setloader] = useState(false);

  const { setSignupData } = AuthAction;
  const auth = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.theme.theme);
  // console.log('🚀 ~ file: index.js ~ line 26 ~ SignUp ~ auth', auth.signupData);
  const dispatch = useDispatch();

  const Verify = () => {
    if (isEmpty(moNumber)) {
      Alert.alert('Error!', 'Please Enter Mobile Number');
    } else if (!mobilevalidate(moNumber)) {
      Alert.alert('Error!', 'Please Enter Valid Mobile Number');
    } else if (isEmpty(password)) {
      Alert.alert('Error!', 'Please Enter Password');
    } else if (!validatePassword(password)) {
      Alert.alert(
        'Error!',
        'Password must contains uppercase, lowercase,number,special character and minimium length should be 6.',
      );
    } else if (password !== confirmPassword) {
      Alert.alert('Error!', 'Password and Confirm Password must be same');
    } else {
      SignUp();
    }
  };

  const mobilevalidate = (text) => {
    const reg = /^[+0]?[56789]\d{5,20}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 4,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      if (value.length <= 15) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const SignUp = () => {
    setloader(true);
    const signupData = {
      moNumber,
      password,
      promoCode,
    };
    const data = {
      phoneNumber: moNumber,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    getApiData(BaseSetting.endpoints.signUpOtp, 'post', data, headers)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 46 ~ .then ~ result', result);
        if (result?.success && result?.result) {
          navigation.navigate('Otp');
          //Alert.alert('Otp',`Your OTP is ${result?.result}`);
          dispatch(setSignupData(signupData));
        } else {
          Alert.alert('Error', `${result?.error}`);
        }
        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 48 ~ .then ~ err', err);
        setloader(false);
        Toast.show('Something went wrong!');
      });
  };

  return (
    <>
      <BackgroundImage image={currentTheme == 'Dark' ? Images.backgroundImageSec : Images.white_background} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraHeight={100}
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
            value={t('welcome')}
            color={theme().amberTxt}
            size={24}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={t('addDetails')}
            color={theme().yellow}
            size={14}
            fontFamily={FontFamily.Poppins_Regular}
          />
          <CInput
            placeholder={t('phMobileNumber')}
            showLeftIcon
            value={moNumber}
            onChangeText={setmoNumber}
            keyboardType="phone-pad"
            contStyle={styles.cInput}
          />
          <CInput
            placeholder={t('phPassword')}
            showLeftIcon
            onRightIconPress={() => {
              setsecureTextEntry(!secureTextEntry);
            }}
            leftIcon={Icons.password}
            value={password}
            onChangeText={setpassword}
            secureTextEntry={secureTextEntry}
            showRightIcon
            contStyle={styles.cInput}
            maxLength={15}
          />
          <CInput
            placeholder={t('phConfirmPassword')}
            showLeftIcon
            onRightIconPress={() => {
              setsecureTextEntry(!secureTextEntry);
            }}
            leftIcon={Icons.password}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            secureTextEntry={secureTextEntry}
            showRightIcon
            contStyle={styles.cInput}
            maxLength={15}
          />
          {/* <CInput
            placeholder={t('phEnterPromoCode')}
            showLeftIcon
            leftIcon={Icons.tag_outline}
            value={promoCode}
            onChangeText={setpromoCode}
            contStyle={styles.cInput}
          />*/}
          <View style={styles.rowStyle}>
            <CButton
              title={t('next')}
              style={styles.btnStyle}
              onPress={() => {
                Verify();
                // navigation.navigate('Otp');
              }}
            />
            <View style={styles.forgotStyle}>
              <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={{
                  top: 20,
                  bottom: 20,
                  left: 20,
                  right: 20,
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <CText
                  value={t('alreadyUser')}
                  color={theme().yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CLoader loader={loader} />
    </>
  );
}
