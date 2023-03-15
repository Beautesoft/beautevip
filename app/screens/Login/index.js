import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
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
import { getFcmToken } from '../../firebase/fcmtoken';

export default function Login({ navigation }) {
  const styles = styledFunc();
  const { setUserData, setStoreData, logout, updateUserData } = AuthAction;
  const dispatch = useDispatch();
  const [moNumber, setmoNumber] = useState('');
  const [password, setpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [loader, setloader] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const Validate = () => {
    if (isEmpty(moNumber)) {
      Alert.alert('Error !', 'Please Enter Mobile Number!');
    } else if (isEmpty(password)) {
      Alert.alert('Error !', 'Please Enter Password!');
    } else {
      handleLogin();
    }
  };
  useEffect(() => {
    getClientDetails();
  }, []);
  const getClientDetails = () => {
    getApiData(BaseSetting.endpoints.getClientDetails, 'get')
      .then((result) => {
        if (result?.success == 1) {
          setClientDetails(result.result);
          dispatch({
            type: 'GET_CLIENT_DETAILS',
            clientDetailsData: result?.result,
          });
        }
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: index.js ~ getClientDetails ~ line 60 ~ .then ~ err',
          err,
        );
      });
  };

  const handleLogin = () => {
    setloader(true);
    const data = {
      phoneNumber: moNumber,
      storeCode: clientDetails?.clientCode,
      passcode: password,
    };
    console.log('🚀 ~ file: index.js ~ line 24 ~ login ~ data', data);
    getApiData(BaseSetting.endpoints.customerLogin, 'post', data)
      .then((result) => {
        setloader(false);
        if (result?.success == 1) {
          //  dispatch(setUserData(result?.result));
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: result?.result,
          });
        }
        setFcmToken(result?.result);
        Toast.show(result?.error);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 48 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        setloader(false);
      });
  };

  const setFcmToken = async (user) => {
    const fcmToken = await getFcmToken();
    if (fcmToken) {
      const data = {
        customerCode: user.customerCode,
        phoneNumber: user.customerPhone,
        fcmToken: fcmToken,
      };
      getApiData(BaseSetting.endpoints.setFcmToken, 'post', data)
        .then((result) => {
          console.log('result fcm token', result);
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.js ~ line 48 ~ .then ~ err', err);
        });
    }
  };

  return (
    <>
      <BackgroundImage image={Images.backgroundImageSec} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraHeight={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={{ uri: clientDetails?.clientLogo }}
          resizeMode="contain"
          style={{
            height: 180,
            width: 180,
            marginTop: 102,
            alignSelf: 'center',
          }}
        />
        <View style={styles.container}>
          <CText
            value={t('login')}
            color={theme().amberTxt}
            size={24}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={t('pleaseLogin')}
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
          />
          <View style={styles.rowStyle}>
            <CButton
              title={t('login')}
              style={styles.btnStyle}
              onPress={() => {
                Validate();
                // navigation.navigate('BottomTabsNavigator');
              }}
            />
            <View style={styles.forgotStyle}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <CText
                  value={t('forgotPassword')}
                  color={theme().yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SignUp')}>
                <CText
                  value={t('newUser')}
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
