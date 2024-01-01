import React from 'react';
import { FlatList, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { styledFunc } from './styles';
import { useSelector } from 'react-redux';
import ServiceTable from './ServiceTable';
export default function RangeScreen({ navigation, route }) {
  const styles = styledFunc();
  const serviceData = route?.params?.serviceData;
  const { bookingData } = useSelector((state) => state.auth);
  const handleServiceSelect = (service) => {
    console.log("handleServiceSelect", service);
    navigation.navigate(bookingData === 'oldflow' ? 'BookingScreen' : 'BookingScreenNew', { itemData: service })
  };

  return (
    <>
      <CHeader
        title={serviceData?.departmentName}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
        showCartIcon
        onCartIconPress={() => navigation?.navigate('ShoppingBag', {})}
      />
      <View style={styles.container}>
        <ServiceTable serviceData={serviceData.items} onServiceSelect={handleServiceSelect} />
      </View>
    </>
  );
}
