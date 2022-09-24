import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import Loader from '../../components/Loader';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import BaseSetting from '../../config/settings';
import styles from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';

export default function ChangeUserName({ navigation }) {
  const { updateUserData } = AuthAction;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const [userName, setuserName] = useState(userData?.customerName);
  const [loader, setloader] = useState(false);

  const sendOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
    };

    const updatedData = {
      customerCode: userData?.customerCode,
      customerName: userName,
      phoneNumber: '',
      email: '',
    };

    getApiData(BaseSetting.endpoints.sendOtp, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 23 ~ .then ~ result', result);
        if (result?.success == 1) {
          Alert.alert(`Your OTP is ${result?.result}`);
          navigation.navigate('Otp', {
            type: 'update',
            updatedData: updatedData,
          });

          userData.customerName=userName;
          console.log('🚀  vsk>',userData);
          dispatch(updateUserData(userData));

        }
        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 25 ~ .then ~ err', err);
        setloader(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <CHeader
        title={t('changeUsername')}
        showLeftIcon
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={t('enterNewUsername')}
            placeholderTextColor={BaseColor.darkAmber}
            style={styles.textInput}
            value={userName}
            onChangeText={setuserName}
          />
        </View>
        <CButton title={t('update')} onPress={sendOtp} />
        <Loader loader={loader} />
      </View>
    </>
  );
}
