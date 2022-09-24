import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import styles from './styles';

export default function ServiceScreen({ navigation }) {
  const { userData } = useSelector((state) => state.auth);
  const [serviceList, setserviceList] = useState([]);

  useEffect(() => {
    StoreDetails();
  }, []);

  const StoreDetails = () => {
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;
    console.log('🚀 ~ file: index.js ~ line 146 ~ StoreDeatils ~ url', url);

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          setserviceList(result?.service);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };

  const renderServiceBtn = ({ item, index }) => {
    return (
      <View
        style={{
          width: '25%',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <CircularButton
          iconResource={item.image}
          title={item?.departmentName}
          onPress={() =>
            navigation.navigate('RangeScreen', { serviceData: item })
          }
        />
      </View>
    );
  };
  return (
    <>
      <CHeader title={t('Service')} />
      <View style={styles.container}>
        <FlatList
          numColumns={4}
          data={serviceList}
          renderItem={renderServiceBtn}
          // contentContainerStyle={{
          //   width: '100%',
          // }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </>
  );
}
