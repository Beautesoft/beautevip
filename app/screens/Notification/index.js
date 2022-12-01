import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import moment from 'moment';
import { baseUrl } from '../../config/settings';
export default function Notification({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [notifyArr, setnotifyArr] = useState([]);

  // const notifyArr = [
  //   {
  //     title: 'System Information',
  //     msg: 'A giant spherical celestial body composed',
  //     time: '12:00',
  //   },
  //   {
  //     title: 'System Information',
  //     msg: 'A giant spherical celestial body composed',
  //     time: '12:00',
  //   },
  //   {
  //     title: 'System Information',
  //     msg: 'A giant spherical celestial body composed',
  //     time: '12:00',
  //   },
  // ];

  useEffect(() => {
    GetNotification();
  }, []);

  const GetNotification = () => {
    // const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    const url = `${baseUrl}api/customerNotification?siteCode=${
      userData?.siteCode
    }&customerCode=${userData?.customerCode}&phoneNumber=${
      userData?.customerPhone
    }&status=${`OPEN`}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;
    console.log('🚀 ~ file: index.js ~ line 146 ~ StoreDeatils ~ url', url);

    // getApiData(url, 'get', {})
    //   .then((result) => {
    //     if (result?.success == 1) {
    //       setnotifyArr(result?.result);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
    //     Toast.show('Something went wrong!');
    //   });

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('🚀 ~ file: index.js ~ line 66 ~ response', json);
        setnotifyArr(json?.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CHeader
        title={t('notification')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          keyExtractor={(i, j) => j}
          data={notifyArr}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.notCont}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('NotificationDetail', { nData: item });
                }}>
                <View>
                  <Image
                    source={Icons.bell_fill}
                    style={{ height: 32, width: 32 }}
                    resizeMode="contain"
                  />
                  <CText
                    value={moment(item?.notifyTime).format('LT')}
                    size={14}
                    color={theme().darkAmber}
                    fonttFamily={FontFamily.Poppins_Medium}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    justifyContent: 'space-between',
                  }}>
                  <CText
                    value={item?.salonName}
                    size={16}
                    color={theme().amberTxt}
                    fontFamily={FontFamily.Poppins_SemiBold}
                  />
                  <CText
                    value={item?.message}
                    size={16}
                    color={theme().amberTxt}
                    numberOfLines={1}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{t('noNotifications')}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
}
