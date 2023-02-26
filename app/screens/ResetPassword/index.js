import React, { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import { styledFunc } from './styles';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';
import CInput from '../../components/CInput';
import { Icons } from '../../config/icons';
import CButton from '../../components/CButton';
import { Images } from '../../config/images';
import { isEmpty } from 'lodash';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import AuthAction from '../../redux/reducer/auth/actions';
import Toast from 'react-native-simple-toast';
import CLoader from '../../components/CLoader';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

export default function ResetPassword({ navigation, route }) {
  const styles = styledFunc();
  const { setUserData, setStoreData } = AuthAction;
  const { signupData } = useSelector((state) => state.auth);
  const data = route.params?.data;
  const dispatch = useDispatch();
  //   const [moNumber, setmoNumber] = useState('');
  console.log('data', data);
  const moNumber = data.phoneNumber;
  const [otp, setotp] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [loader, setloader] = useState(false);

  const Validate = () => {
    if (isEmpty(otp)) {
      Alert.alert('Error !', 'Please Enter OTP!');
    } else if (otp.length != 6) {
      Alert.alert('Error !', 'Please Enter six digit otp!');
    } else if (isEmpty(password)) {
      Alert.alert('Error !', 'Please Enter Password!');
    } else if (!validatePassword(password)) {
      Alert.alert(
        'Error!',
        'Password must contains uppercase, lowercase,number,special character and maximum length should be 6.',
      );
    } else if (password !== cpassword) {
      Alert.alert('Error!', 'Password and Confirm Password must be same.');
    } else {
      //   Alert.alert("Success!",`${moNumber},${otp},${password} `)
      Reset();
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
      if (value.length <= 6) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const Reset = () => {
    setloader(true);
    const data = {
      phoneNumber: moNumber,
      otp: otp,
      newPassCode: password,
    };
    console.log('🚀 ~ file: index.js ~ line 24 ~ login ~ data', data);
    getApiData(BaseSetting.endpoints.forgotPasscodeReset, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          //   dispatch(setUserData(result?.result));
          Alert.alert('Success!', 'Your password has been saved successfully.');
          navigation.navigate('Login');
        }
        Toast.show(result?.error);
        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 48 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        setloader(false);
      });
  };

  return (
    <>
      <BackgroundImage image={Images.backgroundImageSec} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={Images.logo}
          style={{
            height: 180,
            width: 180,
            marginTop: 102,
            alignSelf: 'center',
          }}
        />
        <View style={styles.container}>
          <CText
            value={t('resetPassword')}
            color={theme().amberTxt}
            size={24}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          {/* <CText
            value={t('pleaseLogin')}
            color={theme().yellow}
            size={14}
            fontFamily={FontFamily.Poppins_Regular}
          /> */}
          <CInput
            placeholder={t('enterOtpHere')}
            showLeftIcon
            value={otp}
            onChangeText={setotp}
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
          />
          <CInput
            placeholder={t('phConfirmPassword')}
            showLeftIcon
            onRightIconPress={() => {
              setsecureTextEntry(!secureTextEntry);
            }}
            leftIcon={Icons.password}
            value={cpassword}
            onChangeText={setcpassword}
            secureTextEntry={secureTextEntry}
            showRightIcon
            contStyle={styles.cInput}
          />
          <View style={styles.rowStyle}>
            <CButton
              title={t('resetPassword')}
              style={styles.btnStyle}
              onPress={() => {
                Validate();
                // navigation.navigate('BottomTabsNavigator');
              }}
            />
            <View style={styles.forgotStyle}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}>
                <CText
                  value={t('cancel')}
                  color={theme().yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SignUp')}>
                <CText
                  value={t('newUser')}
                  color={theme().yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <CLoader loader={loader} />
    </>
  );
}
