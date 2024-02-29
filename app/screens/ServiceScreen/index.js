import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { styledFunc } from './styles';

export default function ServiceScreen({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const [serviceList, setserviceList] = useState([]);

  useEffect(() => {
    StoreDetails();
  }, []);

  const StoreDetails = () => {
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          setserviceList(result?.service);
          console.log('ServiceScreen-Response', result?.service);
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
          width: '33%',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <CircularButton
           iconSrouce={
            item?.imageUrl
              ? { uri: item?.imageUrl }
              : item?.imageUrl
          }
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
      <CHeader
        title={t('Service')}
        showLeftIcon
        showCartIcon
        onLeftIconPress={() => navigation.goBack()}
        onCartIconPress={() => navigation?.navigate('ShoppingBag', {})}
      />
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          data={serviceList}
          renderItem={renderServiceBtn}
          keyExtractor={(item, index) => index}
        />
      </View>
    </>
  );
}
