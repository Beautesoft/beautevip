import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';

export default function SuccessScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme().black,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <CText
        value={t('accountSucess')}
        color={theme().amberTxt}
        size={22}
        fontFamily={FontFamily.Poppins_SemiBold}
      />
      <CText
        value={t('created')}
        color={theme().amberTxt}
        size={22}
        fontFamily={FontFamily.Poppins_SemiBold}
        style={{ marginTop: -8 }}
      />
      <CText
        value={t('welcomeOnBoard')}
        color={theme().amberTxt}
        size={14}
        fontFamily={FontFamily.Poppins_Regular}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}
