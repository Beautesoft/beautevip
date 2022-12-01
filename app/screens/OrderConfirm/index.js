import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';

export default function OrderConfirm({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <>
      <CHeader title={t('shoppingBag')} showLeftIcon />
      <View
        style={{
          backgroundColor: theme().darkGrey,
          flex: 1,
          marginTop: -16,
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
          paddingTop: 16,
          padding: 16,
        }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CText
            value={t('orderPlaced')}
            color={theme().amberTxt}
            size={22}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={t('yourItemShortly')}
            color={theme().amberTxt}
            size={14}
            fontFamily={FontFamily.Poppins_Regular}
            style={{ marginTop: 24 }}
          />
        </View>
        <CButton title={t('viewOrderDetails')} />
      </View>
    </>
  );
}
