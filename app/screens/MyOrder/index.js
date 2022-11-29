import React, { useState } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { styles } from './styles';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import BaseSetting, { baseUrl } from '../../config/settings';
import { FontFamily } from '../../config/typography';
import Loader from '../../components/Loader';
import OrderItem from '../../components/MyOrder';
import { t } from 'i18next';
const MyOrder = ({ navigation }) => {
  const [loader, setloader] = useState(false);

  const renderOrders = ({ item, index }) => {
    return (
      <View
        style={
          index > 0 ? { borderTopWidth: 1, borderColor: '#534105' } : null
        }>
        <OrderItem
          item={item}
          id={1}
          onPress={() => {
            // let itemList=[];
            // if(selectedTab.id == 5){
            //   item?.items.forEach(it => {
            //     let aItem=[it.itemCode,it.itemName,it.itemQty,'$'+it.unitPrice,'$'+it.promoPrice,'$'+it.itemAmount];
            //     itemList.push(aItem)
            //   });
            // }
            // navigation.navigate('OrderDetails', { orderData: item,oid:selectedTab.id,tData:itemList });
          }}
        />
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={`My Order`}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          data={[
            {
              subject: 'Shan',
              employeeName: 'employeeName',
              duration: '120',
              location: 'location',
              apptStatus: 'apptStatus',
            },
            {
              subject: 'Shan',
              employeeName: 'employeeName',
              duration: '120',
              location: 'location',
              apptStatus: 'apptStatus',
            },
            {
              subject: 'Shan',
              employeeName: 'employeeName',
              duration: '120',
              location: 'location',
              apptStatus: 'apptStatus',
            },
          ]}
          keyExtractor={(item, index) => index}
          renderItem={renderOrders}
          contentContainerStyle={{ flexGrow: 1 }}
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
          style={{ marginTop: 16 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Orders</Text>
            </View>
          )}
        />
        <Loader loader={loader} />
      </View>
    </>
  );
};
export default MyOrder;
