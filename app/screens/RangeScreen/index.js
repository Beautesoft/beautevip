import React from 'react';
import { FlatList, View } from 'react-native';
import CHeader from '../../components/CHeader';
import CircularButton from '../../components/CirculerButton';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import styles from './styles';

export default function RangeScreen({ navigation, route }) {
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
