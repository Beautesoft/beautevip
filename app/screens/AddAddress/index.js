import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import BaseSetting from '../../config/settings';
import { FontFamily } from '../../config/typography';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';

export default function AddAddress({ navigation, route }) {
  const { userData } = useSelector((state) => state.auth);
  console.log(
    '🚀 ~ file: index.js ~ line 16 ~ AddAddress ~ userData',
    userData,
  );
  const screenType = route?.params?.type;
  const addressData = route?.params?.data;

  const [defaultAdd, setdefaultAdd] = useState(
    addressData?.isDefaultAddress ? addressData?.isDefaultAddress : false,
  );
  const [address, setaddress] = useState(
    addressData?.address ? addressData?.address : '',
  );
  const [name, setname] = useState(
    addressData?.customerName ? addressData?.customerName : '',
  );
  const [number, setnumber] = useState('');

  const createAddress = () => {
    const data = {
      // phoneNumber: number,
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      customerName: name,
      // customerName: userData?.customerName,
      customerAddressNumber: addressData?.addressNumber ? addressData?.addressNumber : '',
      addressType: 'Shipping',
      markDefault: defaultAdd,
      address: address,
      locality: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      siteCode: userData?.siteCode,
    };

    const url =
      screenType == 'update'
        ? BaseSetting.endpoints.updateAddress
        : BaseSetting.endpoints.createAddress;

    getApiData(url, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 40 ~ .then ~ err', err);
        Toast.show('Something Went wrong!');
      });
  };

  return (
    <>
      <CHeader
        title={screenType == 'update' ? t('updateAddress') : t('addAddress')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={t('enterYourName')}
            placeholderTextColor={BaseColor.darkAmber}
            style={styles.textInput}
            onChangeText={setname}
            value={name}
          />
          {/* <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor={BaseColor.darkAmber}
            style={styles.textInput}
            onChangeText={setnumber}
          /> */}
          <TextInput
            placeholder={t('enterAddress')}
            placeholderTextColor={BaseColor.darkAmber}
            style={styles.textInput}
            value={address}
            onChangeText={setaddress}
          />
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            activeOpacity={0.7}
            onPress={() => setdefaultAdd(!defaultAdd)}>
            <Image
              source={defaultAdd ? Icons.checked : Icons.uncheck}
              style={{ height: 20, width: 20, marginEnd: 16 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: BaseColor.amberTxt,
                fontSize: 14,
                fontFamily: FontFamily.Poppins_Regular,
              }}>
              {t('setDefAdd')}
            </Text>
          </TouchableOpacity>
        </View>
        <CButton
          title={t('save')}
          onPress={() => {
            createAddress();
          }}
        />
      </View>
    </>
  );
}
