import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { styledFunc } from './styles';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import CLoader from '../../components/CLoader';
import { theme } from '../../redux/reducer/theme';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import moment from 'moment';
const MyOrder = ({ navigation, route }) => {
  const styles = styledFunc();
  const [loader, setloader] = useState(false);
  const [orderList, setorderList] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const resetFlow = !!route.params?.resetFlow;
  useEffect(() => {
    transactionInVoice();
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (resetFlow) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabsNavigator' }],
        });
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
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
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate('OrderDetails');
        }}
        activeOpacity={1}
        style={styles.itemContainer}>
        <View style={styles.dataContainer}>
          <View style={{ width: '72%' }}>
            <CText
              value={`${item.invoiceNo}`}
              color={theme().amberTxt}
              size={14}
              isBold
            />
            <CText
              value={moment(item.transactionDate).format(
                'DD/MM/YYYY - hh:mm A',
              )}
              size={14}
              color={theme().amberTxt}
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
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <View style={{ width: '70%' }}>
            <FlatList data={item.items} renderItem={renderOrderItems} />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            onPress={() => {
              navigation.navigate('Invoice', { data: item });
            }}>
            <Text
              style={{
                fontSize: 14,
                color: theme().amberTxt,
                textDecorationLine: 'underline',
              }}>
              Invoice
            </Text>
          </TouchableOpacity>
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
          alignItems: 'flex-start',
        }}>
        <View style={styles.dot} />
        <CText
          value={`${item.itemName} - ${item.itemQty}`}
          color={theme().white}
          size={14}
        />
      </View>
    );
  };
  return (
    <>
      <CHeader
        title={'My Order'}
        showLeftIcon
        onLeftIconPress={() => {
          if (resetFlow) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabsNavigator' }],
            });
          } else {
            navigation.goBack();
          }
        }}
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
        <CLoader loader={loader} />
      </View>
    </>
  );
};
export default MyOrder;
