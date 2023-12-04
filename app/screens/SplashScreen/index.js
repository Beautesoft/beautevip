import { t } from 'i18next';
import React from 'react';
import { Text, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';

export default function SplashScreen({ navigation }) {
  const styles = styledFunc();
  const { setUserData, setStoreData } = AuthAction;
  const dispatch = useDispatch();

  const uData = {
    clientLogo:
      'http://103.253.15.102:88/wellness/wellnessimages/GCHQ/ClientLogo.jpg',
    country: 'Singapore',
    currency: 'SGD',
    customerAddress: '',
    customerCode: 'CUSTAPP001',
    customerName: '',
    customerPhone: '',
    customerStripeId: '',
    email: '',
    mobileUserFrom: '',
    nric: '',
    pdpaStatus: false,
    profilePic:
      'http://103.253.15.102:88/wellness/wellnessimages/GCHQ/ClientLogo.jpg',
    referenceCode: '',
    salutation: '',
    siteCode: 'TN01',
    storeName: 'TC',
  };

  return (
    <>
<<<<<<< HEAD
      <View style={{ flex: 1 }}>
        <BackgroundImage />
        <View style={styles.container}>
          <CText
            value={t('welcomeCAP')}
            style={styles.heading}
            fontFamily={FontFamily.Poppins_SemiBold}
            size={20}
          />
          <CText
            value={t('beautisoftVIP')}
            style={styles.heading}
            fontFamily={FontFamily.Poppins_SemiBold}
            size={20}
          />
          <CButton
            title={t('getStarted')}
            style={styles.btnStyle}
            onPress={
              () => navigation.navigate('Login')
              //dispatch(setUserData(uData))
            }
          />
        </View>
=======
      <BackgroundImage image={theme == 'Dark' ? Images.backgroundImageSec : Images.white_background} />
      <View style={styles.container}>
        <CText
          value={t('welcomeCAP')}
          style={styles.heading}
          fontFamily={FontFamily.Poppins_SemiBold}
          size={20}
        />
        <CText
          value={t('beautisoftLuxelle')}
          style={styles.heading}
          fontFamily={FontFamily.Poppins_SemiBold}
          size={20}
        />
        <CButton
          title={t('getStarted')}
          style={styles.btnStyle}
          onPress={
            () => navigation.navigate('Login')
            //dispatch(setUserData(uData))
          }
        />
>>>>>>> 8978276 (ios:modification-client-luxelle)
      </View>
    </>
  );
}
