import { t } from 'i18next';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { Images } from '../../config/images';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import moment from 'moment';

export default function NotificationDetail({ navigation, route }) {
  const styles = styledFunc();
  const nData = route?.params?.nData;

  return (
    <>
      <CHeader
        title={t('details')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          showsVerticalScrollIndicator={false}>
          <Image
            source={Images.sampleOne}
            resizeMode="cover"
            style={{ height: 200, width: '100%', borderRadius: 18 }}
          />
          <View style={{ padding: 12 }}>
            <CText
              value={nData?.salonName}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_Medium}
            />
            <CText
              value={nData?.message}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_Medium}
            />
            <CText
              value={moment(nData?.notifyTime).format('DD-MM-YYYY LT')}
              color={'#6E7781'}
              size={14}
            />
            <CText value={nData?.remarks} color={theme().white} size={18} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
