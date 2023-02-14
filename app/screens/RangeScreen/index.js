import React from 'react';
import { FlatList, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { styledFunc } from './styles';

export default function RangeScreen({ navigation, route }) {
  const styles = styledFunc();
  const serviceData = route?.params?.serviceData;

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
          title={item?.rangeName}
          onPress={() => navigation.navigate('SubService', { itemData: item })}
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
          data={serviceData?.ranges}
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
