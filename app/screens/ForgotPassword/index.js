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
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import CLoader from '../../components/CLoader';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ForgotPassword({ navigation }) {
  const styles = styledFunc();
  const { setSignupData, setStoreData } = AuthAction;
  const dispatch = useDispatch();
  const [moNumber, setmoNumber] = useState('');
  const [password, setpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [loader, setloader] = useState(false);

  const Validate = () => {
    if (isEmpty(moNumber)) {
      Alert.alert('Error !', 'Please Enter Mobile Number!');
    } else if (!mobilevalidate(moNumber)) {
      Alert.alert('Error !', 'Please Enter Valid Mobile Number!!');
    } else {
      Forgot();
    }
  };
  const mobilevalidate = (text) => {
    const reg = /^[0]?[789]\d{5,13}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const Forgot = () => {
    setloader(true);
    const data = {
      phoneNumber: moNumber,
      storeCode: 'TNC',
      passcode: password,
    };
    console.log('🚀 ~ file: index.js ~ line 24 ~ login ~ data', data);
    getApiData(BaseSetting.endpoints.sendOtp, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          navigation.navigate('ResetPassword', { data });
          //Alert.alert("Otp!",`${result?.result}`)
          dispatch(setSignupData(data));
        } else {
          Toast.show(result?.error);
        }

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

      <KeyboardAwareScrollView
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
            value={t('forgotPassword')}
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
            placeholder={t('phMobileNumber')}
            showLeftIcon
            value={moNumber}
            onChangeText={setmoNumber}
            keyboardType="phone-pad"
            contStyle={styles.cInput}
          />
          {/* <CInput
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
          /> */}
          <View style={styles.rowStyle}>
            <CButton
              title={t('forgotPassword')}
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
                  value={t('login')}
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
      </KeyboardAwareScrollView>
      <CLoader loader={loader} />
    </>
  );
}
