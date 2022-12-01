import React from 'react';
import { FlatList, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { styledFunc } from './styles';

export default function SubService({ navigation, route }) {
  const styles = styledFunc();
  const rangeData = route?.params?.itemData;

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
          title={item?.itemName}
          onPress={() =>
            navigation.navigate('BookingScreen', { itemData: item })
          }
        />
      </View>
    );
  };
  return (
    <>
      <CHeader
        title={rangeData?.rangeName}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          numColumns={4}
          data={rangeData?.items}
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
