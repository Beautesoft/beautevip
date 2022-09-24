import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import BaseSetting from '../../config/settings';
import { FontFamily } from '../../config/typography';
import styles from './styles';

import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';


export default function ChangeAddress({ navigation }) {
  const { userData } = useSelector((state) => state.auth);
  const [selectedAdd, setselectedAdd] = useState({});
  const [addressArr, setaddressArr] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const { updateUserData } = AuthAction;
  const dispatch = useDispatch();




  useFocusEffect(
    React.useCallback(() => {
      GetAddress();
    }, []),
  );

  const onRefresh = () => {
    setrefreshing(true);
    GetAddress();
  };

  const GetAddress = () => {
    const addressType = 'Shipping';
    // const url = `/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=${addressType}&siteCode=${userData?.siteCode}`;
    const url = `http://103.253.15.102:88/main_api/api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;
    console.log('🚀 ~ file: index.js ~ line 45 ~ GetAddress ~ url', url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setaddressArr(json?.result);
        setrefreshing(false);
        setselectedAdd(json?.result?.[0]);
        console.log('🚀 ~ file: 51 ~ GetAddress ~', json?.result);
      })
      .catch((error) => {
        setrefreshing(false);
        console.error(error);
      });
  };

  const updateAddress = (item) => {

    console.log('🚀 ~ data 60:>', item);

    const data = {
      // phoneNumber: number,
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      customerName: item?.customerName,
      customerAddressNumber: item?.addressNumber,
      // customerName: userData?.customerName,
      addressType: 'Shipping',
      markDefault: true,
      address: item?.address,
      locality: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      siteCode: userData?.siteCode,
    };

    const url = BaseSetting.endpoints.updateAddress;

    getApiData(url, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 80 ~ .then ~ succ', result);
        if (result?.success == 1) {
          // navigation.goBack();
          try {
            userData.customerAddress=item?.address; 
            dispatch(updateUserData(userData));
          } catch (error) {
            
          }
          GetAddress();
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 40 ~ .then ~ err', err);
        Toast.show('Something Went wrong!');
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
        title={t('changeAddress')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          data={addressArr}
          keyExtractor={(item, index) => index}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.addCont}
                activeOpacity={0.7}
                onPress={() => {
                  setselectedAdd(item);
                  updateAddress(item);
                }}>
                <View activeOpacity={0.7} onPress={() => setselectedAdd(item)}>
                  <Image
                    source={
                      item?.isDefaultAddress ? Icons.checked : Icons.uncheck
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ flex: 1, marginStart: 16 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.Poppins_Medium,
                        fontSize: 14,
                        color: BaseColor.amberTxt,
                      }}>
                      {item?.customerName}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate('AddAddress', {
                          type: 'update',
                          data: item,
                        });
                      }}>
                      <Image
                        source={Icons.pencil}
                        style={{ height: 18, width: 18 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: FontFamily.Poppins_Medium,
                      fontSize: 14,
                      marginTop: 4,
                      color: BaseColor.amberTxt,
                    }}>
                    {`${item?.address}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <CButton
          title={t('addAnotherAddress')}
          onPress={() => {
            navigation.navigate('AddAddress');
          }}
        />
      </View>
    </>
  );
}
