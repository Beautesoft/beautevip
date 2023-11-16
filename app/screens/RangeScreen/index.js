import React from 'react';
import { FlatList, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { styledFunc } from './styles';
import { useSelector } from 'react-redux';
export default function RangeScreen({ navigation, route }) {
  const styles = styledFunc();
  const serviceData = route?.params?.serviceData;
  const { bookingData } = useSelector((state) => state.auth);
  const renderServiceBtn = ({ item, index }) => {
    return (
      <View
        style={{
          width: '25%',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <CircularButton
        iconSrouce={
            item?.imageUrl
              ? { uri: item?.imageUrl }
              : item?.imageUrl
          }
          title={item?.itemName}
          onPress={() => navigation.navigate(
            bookingData === 'oldflow' ? 'BookingScreen' : 'BookingScreenNew',
            { itemData: item },
          )}
        />
      </View>
    );
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
        <FlatList
          numColumns={4}
          data={serviceData?.items}
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
