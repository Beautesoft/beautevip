import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CLoader from '../../components/CLoader';
import { getApiData } from '../../config/apiHelper';
import { Icons } from '../../config/icons';
import BaseSetting from '../../config/settings';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { theme } from '../../redux/reducer/theme';

export default function ChangePassword({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [oldPassowrd, setoldPassowrd] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [conPassword, setconPassword] = useState('');

  const [loader, setloader] = useState(false);

  const ResetPassword = () => {
    setloader(true);
    const data = {
      phoneNumber: '',
      customerCode: userData?.customerCode,
      oldPasscode: oldPassowrd,
      passcode: newPassword,
      confirmedPasscode: conPassword,
    };
    console.log('🚀 ~ file: index.js ~ line 27 ~ ResetPassword ~ data', data);

    getApiData(BaseSetting.endpoints.changePasscode, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          Toast.show('Paasword is Updated!');
          navigation.goBack();
        } else if (result?.success == 0) {
          Toast.show(result?.error);
        }
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 30 ~ .then ~ result', result);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 33 ~ .then ~ err', err);
      });
  };
  return (
    <>
      <CHeader
        title={t('changePassword')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={t('enterCurrentPassword')}
            placeholderTextColor={theme().darkAmber}
            style={styles.textInput}
            onChangeText={setoldPassowrd}
          />
          <TextInput
            placeholder={t('enterNewPassword')}
            placeholderTextColor={theme().darkAmber}
            style={styles.textInput}
            onChangeText={setnewPassword}
          />
          <TextInput
            placeholder={t('confirmNewPassword')}
            placeholderTextColor={theme().darkAmber}
            style={styles.textInput}
            onChangeText={setconPassword}
          />
        </View>
        <CButton
          title={t('update')}
          onPress={() => {
            if (isEmpty(oldPassowrd)) {
              Alert.alert('Please enter Current Password');
            } else if (isEmpty(newPassword)) {
              Alert.alert('Please enter New Password');
            } else if (newPassword !== conPassword) {
              Alert.alert('Password and Confirm Password must be same');
            } else {
              ResetPassword();
            }
          }}
        />
      </View>
      <CLoader loader={loader} />
    </>
  );
}
