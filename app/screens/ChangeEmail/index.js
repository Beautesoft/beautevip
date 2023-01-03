import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CLoader from '../../components/CLoader';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import { styledFunc } from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';
import { theme } from '../../redux/reducer/theme';

export default function ChangeEmail({ navigation }) {
  const styles = styledFunc();
  const { updateUserData } = AuthAction;
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);

  const [email, setemail] = useState(userData?.email);
  const [loader, setloader] = useState(false);

  const sendOtp = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
    };

    const updatedData = {
      customerCode: userData?.customerCode,
      customerName: '',
      phoneNumber: '',
      email: email,
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
          userData.email = email;
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
        title={t('changeEmail')}
        showLeftIcon
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <TextInput
          placeholder={t('enterNewEmail')}
          placeholderTextColor={theme().darkAmber}
          style={styles.textInput}
          value={email}
          onChangeText={setemail}
        />
        <CButton title={t('update')} onPress={sendOtp} />
        <CLoader loader={loader} />
      </View>
    </>
  );
}
