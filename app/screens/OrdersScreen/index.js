import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import BaseSetting from '../../config/settings';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';

export default function OrdersScreen({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [selectedTab, setselectedTab] = useState({
    id: 1,
    title: 'Upcoming',
  });
  const [orderList, setorderList] = useState([]);
  const [allOrder, setAllOrder] = useState();
  const [loader, setloader] = useState(false);
  const [refreshing, setrefreshing] = useState(false);

  // const tabArr = [
  //   {
  //     id: 1,
  //     title: t('all'),
  //   },
  //   {
  //     id: 2,
  //     title: t('booking'),
  //   },
  //   {
  //     id: 3,
  //     title: t('confirm'),
  //   },
  //   // {
  //   //   id: 4,
  //   //   title: t('waiting'),
  //   // },
  //   {
  //     id: 4,
  //     title: t('cancel'),
  //   },
  //   {
  //     id: 5,
  //     title: t('history'),
  //   },
  // ];
  const tabArr = [
    {
      id: 1,
      title: 'Upcoming',
    },
    {
      id: 5,
      title: t('history'),
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      appointmentSearch(1);
      setselectedTab({
        id: 1,
        title: 'Upcoming',
      });
    }, []),
  );

  const onRefresh = () => {
    // if (selectedTab.id != 5) {
    setrefreshing(true);
    appointmentSearch(selectedTab.id);
    // }
  };

  let backPressed = 0;

  function handleBackButtonClick() {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      Toast.show('Press Again To Exit');
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const setOrderResults = (status, result) => {
    if (result?.futureAppointments) {
      if (status == 2) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus == 'Booking') {
            allList.push(result?.result[i]);
          }
        }
        for (let i = 0; i < result?.futureAppointments.length; i++) {
          if (result?.futureAppointments[i].apptStatus == 'Booking') {
            allList.push(result?.futureAppointments[i]);
          }
        }
        setorderList(allList);
      } else if (status == 3) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus.includes('Confirm')) {
            allList.push(result?.result[i]);
          }
        }
        for (let i = 0; i < result?.futureAppointments.length; i++) {
          if (result?.futureAppointments[i].apptStatus.includes('Confirm')) {
            allList.push(result?.futureAppointments[i]);
          }
        }
        setorderList(allList);
      } else if (status == 4) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus == 'Cancelled') {
            allList.push(result?.result[i]);
          }
        }
        for (let i = 0; i < result?.futureAppointments.length; i++) {
          if (result?.futureAppointments[i].apptStatus == 'Cancelled') {
            allList.push(result?.futureAppointments[i]);
          }
        }
        setorderList(allList);
      } else if (status == 5) {
        setorderList([...result?.result]);
      } else {
        setorderList([...result?.result, ...result?.futureAppointments]);
      }
    } else {
      if (status == 2) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus == 'Booking') {
            allList.push(result?.result[i]);
          }
        }
        setorderList(allList);
      } else if (status == 3) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus.includes('Confirm')) {
            allList.push(result?.result[i]);
          }
        }
        setorderList(allList);
      } else if (status == 4) {
        var allList = [];
        for (let i = 0; i < result?.result.length; i++) {
          if (result?.result[i].apptStatus == 'Cancelled') {
            allList.push(result?.result[i]);
          }
        }
        setorderList(allList);
      } else {
        setorderList([...result?.result]);
      }
    }
  };

  const appointmentSearch = (status) => {
    setorderList([]);
    setloader(true);
    const data = {
      customerCode: userData?.customerCode,
      status: '',
    };

    getApiData(BaseSetting.endpoints.appointmentSearch, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          console.log('result order screen', result);
          // if (result?.futureAppointments) {
          //   setorderList([...result?.result, ...result?.futureAppointments]);

          // } else {
          //   setorderList([...result?.result]);
          // }
          setAllOrder(result);
          //  setOrderResults(status, result);
          setorderList(result.futureAppointments);
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
      <View
        style={
          index > 0 ? { borderTopWidth: 1, borderColor: '#534105' } : null
        }>
        <OrderItem
          item={item}
          id={selectedTab.id}
          onPress={() => {
            let itemList = [];
            // if(selectedTab.id == 5){
            //   item?.items.forEach(it => {
            //     let aItem=[it.itemCode,it.itemName,it.itemQty,'$'+it.unitPrice,'$'+it.promoPrice,'$'+it.itemAmount];
            //     itemList.push(aItem)
            //   });
            // }

            navigation.navigate('OrderDetails', {
              orderData: item,
              oid: selectedTab.id,
              tData: itemList,
            });
          }}
        />
      </View>
    );
  };

  return (
    <>
      <CHeader title="My Booking" />
      <View style={styles.container}>
        <View>
          <FlatList
            horizontal
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              flexGrow: 1,
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.tabCont,
                    {
                      borderColor:
                        item.id === selectedTab.id
                          ? theme().amberTxt
                          : '#434343',
                    },
                  ]}
                  onPress={() => {
                    setselectedTab(item);
                    if (item.id === 5) {
                      setorderList(allOrder.result);
                    } else {
                      setorderList(allOrder.futureAppointments);
                    }
                    // if (item.id == 5) {
                    //   setorderList([]);
                    //   //transactionInVoice();
                    //   appointmentSearch(item.id);
                    // } else {
                    //   appointmentSearch(item.id);
                    // }
                  }}
                  activeOpacity={0.7}
                  key={index}>
                  <CText
                    value={item.title}
                    color={
                      item.id === selectedTab.id ? theme().amberTxt : '#434343'
                    }
                    size={14}
                  />
                </TouchableOpacity>
              );
            }}
            data={tabArr}
          />
        </View>

        <FlatList
          data={orderList}
          keyExtractor={(item, index) => index}
          renderItem={renderOrders}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      </View>
      <Loader loader={loader} />
    </>
  );
}
