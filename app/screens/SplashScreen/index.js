import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/reducer/theme/themeAction';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import { Images } from '../../config/images';
export default function SplashScreen({ navigation }) {
  const styles = styledFunc();
  const { setUserData, setStoreData } = AuthAction;
  const [clientDetails, setClientDetails] = useState([]);
  const [theme, setTheme] = useState();
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
    siteCode: 'KBHQ',
    storeName: 'TC',
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
          const theme = result?.result?.theme?.toLowerCase();
          const themeResult = theme === 'dark' ? "Dark" : "Light";     
          setTheme(themeResult);
          dispatch(changeTheme(themeResult));
        }
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: index.js ~ getClientDetails ~ line 60 ~ .then ~ err',
          err,
        );
      });
  };
  return (
    <>
      <BackgroundImage image={theme == 'Dark' ? Images.backgroundImageSec : Images.white_background} />
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
        <CButton
          title={t('Get Started Without Login')}
          style={styles.btnStyle}
          onPress={
            () => 
            //dispatch(setUserData(uData))
            dispatch({
              type: 'LOGIN_SUCCESS',
              data: uData,
            })
          }
        />
      </View>
    </>
  );
}
