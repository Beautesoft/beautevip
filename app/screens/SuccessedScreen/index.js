import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import CText from '../../components/CText';
import BaseColor from '../../config/colors';
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
        backgroundColor: BaseColor.black,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <CText
        value={t('accountSucess')}
        color={BaseColor.amberTxt}
        size={22}
        fontFamily={FontFamily.Poppins_SemiBold}
      />
      <CText
        value={t('created')}
        color={BaseColor.amberTxt}
        size={22}
        fontFamily={FontFamily.Poppins_SemiBold}
        style={{ marginTop: -8 }}
      />
      <CText
        value={t('welcomeOnBoard')}
        color={BaseColor.amberTxt}
        size={14}
        fontFamily={FontFamily.Poppins_Regular}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}
