import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { styledFunc } from './styles';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { theme } from '../../redux/reducer/theme';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import moment from 'moment';
const MyOrder = ({ navigation }) => {
  const styles = styledFunc();
  const [loader, setloader] = useState(false);
  const [orderList, setorderList] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    transactionInVoice();
  }, []);
  const transactionInVoice = () => {
    setorderList([]);
    setloader(true);
    const data = {
      siteCode: userData?.siteCode,
      customerName: userData?.customerName,
      fromDate: '1900-01-01',
      toDate: '2200-12-31',
      staffName: '',
      invoiceNo: '',
    };

    getApiData(BaseSetting.endpoints.appTransSearchInvoice, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          // if (result?.futureAppointments) {
          //   setorderList([...result?.result, ...result?.futureAppointments]);

          // } else {
          //   setorderList([...result?.result]);
          // }
          console.log('result my order', result);
          setorderList([...result?.result]);
        }
        setloader(false);
        setrefreshing(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 67 ~ .then ~ err', err);
        setloader(false);
        setrefreshing(false);
      });
  };
  const renderOrders = ({ item, index }) => {
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('Invoice')}
      //   activeOpacity={0.8}
      //   style={styles.productContainer}>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'Service : '}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //     <CText
      //       value={'Essential Oil Massage'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'Date/Time : '}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //     <CText
      //       value={'20 Nov 2022 04:30-05:30'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'Location : '}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //     <CText
      //       value={'Gracious Pvt Ltd'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'208 new upper changi road #01-659'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'Staff : '}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //     <CText
      //       value={'Ivy'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      //   <View style={styles.itemContainer}>
      //     <CText
      //       value={'Status : '}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //     <CText
      //       value={'Done'}
      //       size={14}
      //       color={'#B1B1B1'}
      //       style={styles.text}
      //     />
      //   </View>
      // </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetails');
        }}
        activeOpacity={0.8}
        style={styles.itemContainer}>
        {/* <View style={{ width: '30%' }}>
          <Image
            source={require('../../assets/images/goals.png')}
            style={styles.orderImage}
          />
        </View> */}
        <View style={styles.dataContainer}>
          <View style={{ width: '72%' }}>
            <CText
              value={`${item.invoiceNo}`}
              // color={theme().white}
              // style={{ marginBottom: 10 }}
              color={theme().amberTxt}
              size={14}
              isBold
            />
            <CText
              value={moment(item.transactionDate).format('DD/MM/YYYY')}
              // color={theme().white}
              size={14}
              color={theme().amberTxt}
              // style={{ marginBottom: 5 }}
              isBold
            />
          </View>
          <CText
            value={`$ ${item.depositAmount.toFixed(2)}`}
            color={theme().amberTxt}
            size={14}
            isBold
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList data={item.items} renderItem={renderOrderItems} />
        </View>
      </TouchableOpacity>
    );
  };
  const renderOrderItems = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.dot} />
        <CText value={item.itemName} color={theme().white} size={14} />
      </View>
    );
  };
  return (
    <>
      <CHeader
        title={'My Order'}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={orderList}
            keyExtractor={(item, index) => index}
            renderItem={renderOrders}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <View style={styles.noOrder}>
                <Text>No Orders</Text>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: theme().white,
                }}
              />
            )}
          />
        </View>
        <Loader loader={loader} />
      </View>
    </>
  );
};
export default MyOrder;
