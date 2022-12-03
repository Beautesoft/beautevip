import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import BaseSetting, { baseUrl } from '../../config/settings';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';

import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
export default function ProfileScreen({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const [, setreferalCaode] = useState();
  const [proPic, setpropic] = useState();
  const { updateUserData } = AuthAction;
  const dispatch = useDispatch();

  let backPressed = 0;

  function handleBackButtonClick() {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      Toast.show('Press Again To Exit');
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    GetCustomerReferalCode();
    setpropics();
  }, []);

  const GetAddress = () => {
    const url = `${baseUrl}api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        try {
          userData.customerAddress = json?.result?.[0].address;
          dispatch(updateUserData(userData));
        } catch (error) {}
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setpropics = () => {
    const proPic = userData?.profilePic
      ? '' + userData?.profilePic
      : userData.clientLogo;
    console.log('111Vk>', proPic);
    if (proPic == 33) {
      setpropic('' + userData?.clientLogo);
    } else {
      setpropic(proPic);
    }
  };

  const GetCustomerReferalCode = () => {
    const data = {
      customerCode: userData?.customerCode,
    };

    getApiData(BaseSetting?.endpoints?.customerReferalCode, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 25 ~ .then ~ result', result);
        if (result?.success == 1) {
          setreferalCaode(result?.result);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 27 ~ .then ~ err', err);
      });
  };

  const [imageError, setImageError] = useState(true);

  const onImageNotFound = () => {
    setImageError(false);
  };

  return (
    <>
      <CHeader title={t('myProfile')} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollCont}>
          <TouchableOpacity style={styles.proCont}>
            <Image
              source={imageError ? { uri: '' + proPic } : { uri: '' + proPic }}
              onError={() => onImageNotFound()}
              style={styles.proPhoto}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <CText
            value={userData?.customerName}
            color={theme().amberTxt}
            size={20}
            fontFamily={FontFamily.Poppins_Medium}
            style={{ marginTop: 8 }}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 12,
              marginTop: 24,
            }}>
            <TouchableOpacity
              style={[styles.btnStyle, { marginEnd: 12 }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Settings')}>
              <Image
                source={Icons.settings}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
                tintColor={theme().darkGrey}
              />
              <Text style={styles.btnStyleTxt}>{t('settings')}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyOrder');
            }}>
            <CText
              value={'My Order'}
              color="#b1b1b1"
              size={16}
              fontFamily={FontFamily.Poppins_Medium}
              style={{ marginTop: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyPackagesNew');
            }}>
            <CText
              value={'My Packages'}
              color="#b1b1b1"
              size={16}
              fontFamily={FontFamily.Poppins_Medium}
              style={{ marginTop: 24 }}
            />
          </TouchableOpacity>

          {/* <CText
            value={t('inviteFriend')}
            color="#b1b1b1"
            size={16}
            fontFamily={FontFamily.Poppins_Medium}
            style={{ marginTop: 24 }}
          /> */}

          {/* <TouchableOpacity
            style={styles.shareCont}
            activeOpacity={0.7}
            onPress={() => {
              Share.share({
                message: `Use the promo code "${referalCaode}" for Beautesoft VIP Salon app. \n Download the app now \n "https://play.google.com/store/apps/details?id=com.beautesoft.vip"`,
              });
            }}>
            <Text style={styles.shareTxt}>{referalCaode}</Text>
            <Image
              source={Icons.share}
              style={{ height: 20, width: 20, position: 'absolute', right: 16 }}
              resizeMode="contain"
              tintColor={theme().amberTxt}
            />
          </TouchableOpacity> */}

          {/* <CText
            value={`${t('invites')} : 0`}
            color="#E41F2D"
            size={16}
            fontFamily={FontFamily.Poppins_Medium}
            style={{ marginTop: 4 }}
          /> */}
          <View
            style={{
              marginTop: 64,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CText value={t('needHelp')} color={theme().amberTxt} size={14} />
            <CText
              value={t('contactCust')}
              color={theme().amberTxt}
              size={14}
              fontFamily={FontFamily.Poppins_Medium}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
