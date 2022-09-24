import React, { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import styles from './styles';
import CText from '../../components/CText';
import BaseColor from '../../config/colors';
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

export default function Login({ navigation }) {
  const { setUserData, setStoreData ,logout} = AuthAction;
  const dispatch = useDispatch();
  const [moNumber, setmoNumber] = useState('');
  const [password, setpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [loader, setloader] = useState(false);

  const Validate = () => {
    if (isEmpty(moNumber)) {
      Alert.alert('Error !','Please Enter Mobile Number!');
    } else if (isEmpty(password)) {
      Alert.alert('Error !','Please Enter Password!');
    } else {
      Login();
    }
  };

  const Login = () => {
    setloader(true);
    const data = {
      phoneNumber: moNumber,
      storeCode: 'TNC',
      passcode: password,
    };
    console.log('🚀 ~ file: index.js ~ line 24 ~ login ~ data', data);
    getApiData(BaseSetting.endpoints.customerLogin, 'post', data)
      .then((result) => {
        setloader(false);
        if (result?.success == 1) {
          dispatch(logout());
          dispatch(setUserData(result?.result));
          navigation.navigate('Home');
        }
        Toast.show(result?.error);
        
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
            value={t('login')}
            color={BaseColor.amberTxt}
            size={24}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={t('pleaseLogin')}
            color={BaseColor.yellow}
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
              <TouchableOpacity activeOpacity={0.7}
              onPress={() => 
                navigation.navigate('ForgotPassword')
              }>
                <CText
                  value={t('forgotPassword')}
                  color={BaseColor.yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SignUp')}>
                <CText
                  value={t('newUser')}
                  color={BaseColor.yellow}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      
      <CLoader loader={loader} />
    </>
  );
}
