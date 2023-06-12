import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import { styledFunc } from './styles';
import CText from '../../components/CText';
import { FontFamily } from '../../config/typography';
import CInput from '../../components/CInput';
import { Icons } from '../../config/icons';
import CButton from '../../components/CButton';
import { Images } from '../../config/images';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { isEmpty } from 'lodash';
import validator from 'validator';
import { theme } from '../../redux/reducer/theme';

export default function AddProfileData({ navigation }) {
  const styles = styledFunc();
  const { signupData } = useSelector((state) => state.auth);

  const [name, setname] = useState('');
  const [mail, setmail] = useState('');
  const [address, setaddress] = useState('');
  const [profileData, setprofileData] = useState();

  const [loader, setloader] = useState(false);

  const [showModal, setshowModal] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const { clientDetails } = useSelector((state) => state.auth);

  const onChoosePhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      const tempObj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.path.substring(image?.path.lastIndexOf('/') + 1),
      };
      setprofileData(tempObj);
      setshowModal(false);
      console.log(tempObj);
    });
  };

  const onClickCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
    }).then((image) => {
      const tempObj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.path.substring(image?.path.lastIndexOf('/') + 1),
      };
      setprofileData(tempObj);
      setshowModal(false);
      console.log(tempObj);
    });
  };

  const SignUpCustomer = () => {
    if (isEmpty(name)) {
      Alert.alert('Error', 'Please enter full name.');
      return;
    } else if (name.length < 3) {
      Alert.alert('Error', 'Please enter valid name.');
      return;
    } else if (isEmpty(mail)) {
      Alert.alert('Error', 'Please enter email.');
      return;
    } else if (!validator.isEmail(mail)) {
      Alert.alert('Error', 'Please enter valid email.');
      return;
    }

    setloader(true);
    const data = {
      siteCode: '',
      customerName: name,
      phoneNumber: signupData?.moNumber,
      passCode: signupData?.password,
      customerEmail: mail,
      customerAddress: address,
      referalCode: signupData?.promoCode,
    };
    console.log('🚀 ~ file: index.js ~ line 59 ~ SignUpCustomer ~ data', data);

    getApiData(BaseSetting.endpoints.signUpCustomer, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 75 ~ .then ~ result', result);
        if (result?.success == 1) {
          if (profileData) {
            changeProfile(signupData?.moNumber, result?.result);
          } else {
            navigation.navigate('SuccessScreen');
          }
        } else if (result?.success == 0) {
          Toast.show(result?.error);
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 60 ~ .then ~ err', err);
      });
  };

  const changeProfile = (customerPhone, customerCode) => {
    // const data = {
    //   profile: profileData,
    //   siteCode: '',
    //   phoneNumber: userData?.customerPhone,
    //   customerCode: userData?.customerCode,
    //   notificationFlag: 1,
    // };
    setloader(true);

    const form = new FormData();
    const jsonKeyObj = {
      siteCode: '',
      phoneNumber: customerPhone,
      customerCode: customerCode,
      notificationFlag: 1,
    };

    // form.append('file', profileData);
    // form.append('jsonKey', jsonKeyObj);
    // form.append('phoneNumber', customerPhone);
    // form.append('customerCode', customerCode);
    // form.append('notificationFlag', '1');
    let body = new FormData();
    body.append('profile', {
      uri: profileData.uri,
      name: profileData.name,
      filename: profileData.name,
      type: profileData.type,
    });
    body.append('Content-Type', profileData.type);
    // body.append('jsonKey', jsonKeyObj);
    body.append('siteCode', '');
    body.append('phoneNumber', customerPhone);
    body.append('customerCode', customerCode);
    body.append('notificationFlag', '1');

    console.log(
      '🚀 ~ file: index.js ~ line 104 ~ changeProfile ~ profileData',
      profileData,
      BaseSetting.api + BaseSetting.endpoints.profilePic,
    );
    console.log('🚀 ~ file: index.js ~ line 102 ~ changeProfile ~ form', body);

    fetch(BaseSetting.api + BaseSetting.endpoints.profilePic, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        //'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(
          '🚀 ~ file: index.js ~ line 219 ~ changeProfile ~ result',
          json,
        );
        //if (json?.success == 1) {
        navigation.navigate('SuccessScreen');
        //}
        setloader(false);
      })
      .catch((err) => {
        navigation.navigate('SuccessScreen');
        console.log(
          '🚀 ~ file: index.js ~ line 222 ~ changeProfile ~ err',
          err,
        );
        setloader(false);
      });
  };

  return (
    <>
      <BackgroundImage image={currentTheme == 'Dark' ? Images.backgroundImageSec : Images.white_background} />

      <ScrollView
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
            value={t('addProfileDetail')}
            color={theme().amberTxt}
            size={24}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={t('finalStep')}
            color={theme().yellow}
            size={14}
            fontFamily={FontFamily.Poppins_Regular}
          />
          <CInput
            placeholder={t('addProfilePhoto')}
            showLeftIcon
            leftIcon={Icons.user_square}
            value={name}
            onChange={(val) => setname(val)}
            contStyle={styles.cInput}
            photoPicker
            showRightIcon={profileData ? true : false}
            photoSource={profileData?.uri}
            onPhotoPicker={() => setshowModal(!showModal)}
          />
          <CInput
            placeholder={t('fullName')}
            showLeftIcon
            leftIcon={Icons.profile}
            value={name}
            onChangeText={setname}
            contStyle={styles.cInput}
          />
          <CInput
            placeholder={t('addEmail')}
            showLeftIcon
            leftIcon={Icons.mail}
            value={mail}
            onChangeText={setmail}
            keyboardType="email-address"
            contStyle={styles.cInput}
          />
          <CInput
            placeholder={t('address')}
            showLeftIcon
            leftIcon={Icons.mail}
            value={address}
            onChangeText={setaddress}
            contStyle={styles.cInput}
            multiline
          />
          <CButton
            title={t('next')}
            style={styles.btnStyle}
            onPress={() => {
              SignUpCustomer();
            }}
          />
        </View>
      </ScrollView>

      <CLoader loader={loader} />
      <Modal
        style={{ flex: 1 }}
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setshowModal(!showModal)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setshowModal(false)}
          style={{
            flex: 1,
            backgroundColor: theme().white40,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme().black,
              width: '100%',
              padding: 12,
            }}>
            <CButton
              title={t('clickCamera')}
              style={styles.modalBtn}
              onPress={onClickCamera}
            />
            <CButton
              title={t('chooseGallery')}
              style={styles.modalBtn}
              onPress={onChoosePhoto}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
