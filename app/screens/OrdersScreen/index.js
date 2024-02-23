import React, { useEffect, useState } from 'react';
import {BackHandler,FlatList,RefreshControl,Text,TouchableOpacity,View} from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import CLoader from '../../components/CLoader';
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
  const [currentTab, setCurrentTab] = useState(1);
  const [orderList, setorderList] = useState([]);
  const [allOrder, setAllOrder] = useState();
  const [loader, setloader] = useState(false);
  const [refreshing, setrefreshing] = useState(false);

  const tabArr = [
    {
      id: 1,
      title: 'Upcoming',
    },
    {
      id: 5,
      title: t('history'),
    },
    {
      id: 7,
      title: ('Book Now'),
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      appointmentSearch();
    }, []),
  );

  const onRefresh = () => {
    setrefreshing(true);
    appointmentSearch();
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


  console.log('selectedTab.id', currentTab);
  const appointmentSearch = () => {
    setorderList([]);
    setloader(true);
    const data = {
      customerName: '',
      customerCode: userData?.customerCode,
      status: '',
      employeeCode: '',
      employeeName: '',
      appointmentDate: '',
    };

    getApiData(BaseSetting.endpoints.appointmentSearch, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          setAllOrder(result);
          if (currentTab === 5) {
            setorderList(result.result);
          } else {
            setorderList(result.futureAppointments);
          }
        }
        setloader(false);
        setrefreshing(false);
      })
      .catch((err) => {
        console.log('appointmentSearch - api -error', err);
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
      <CHeader
        title="My Booking"
        showBookingIcon
        onBookingIconPress={() => navigation?.navigate('BookingScreenNew', {})}
      />
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
                    setCurrentTab(item.id);
                    if (item.id === 5) {
                      setorderList(allOrder.result);
                    } else if (item.id === 7) {
                      navigation?.navigate('BookingScreenNew')
                     }
                    else {
                      setorderList(allOrder.futureAppointments);
                    }
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
          data={
            currentTab === 5 ? allOrder?.result : allOrder?.futureAppointments
          }
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
      <CLoader loader={loader} />
    </>
  );
}
