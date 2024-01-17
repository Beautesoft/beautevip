import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getApiData } from '../../config/apiHelper';
import React, { useState, useEffect } from 'react';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import CLoader from '../../components/CLoader';
import { theme } from '../../redux/reducer/theme';
import { styledFunc } from '../MyOrder/styles';
import { useSelector } from 'react-redux';
import BaseSetting from '../../config/settings';
import moment from 'moment';
const MyProducts = ({ navigation, route }) => {
  const resetFlow = !!route.params?.resetFlow;
  const styles = styledFunc();
  const [orderList, setorderList] = useState([]);
  const [loader, setloader] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [refreshing, setrefreshing] = useState(false);
  useEffect(() => {
    transactionInVoice();
  }, []);
  const transactionInVoice = () => {
    setorderList([]);
    setloader(true);
    const data = {
      custCode: userData?.customerCode,
      isHold: true,
      fromDate: '1900-01-01',
      toDate: '2200-12-31',
      invoiceNo: '',
    };

    getApiData(BaseSetting.endpoints.myProducts, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          console.log("myProductsListapi", BaseSetting.endpoints.myProducts);
          console.log("myProductsListinput", data);
          console.log("myProductsList", result?.result);
          setorderList([...result?.result]);
        }
        setloader(false);
        setrefreshing(false);
      })
      .catch((err) => {
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
              value={moment(item.transactionDate).format(
                'DD/MM/YYYY - hh:mm A',
              )}
              size={14}
              color={theme().amberTxt}
              isBold
            />
          </View>
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

          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const renderOrderItems = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <CText
            value={`${item.itemName}`}
            color={theme().white}
            size={14}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <View
            style={{ width: '80%' }}>
            <CText
              value={`Qty  ${item.itemQty}   `}
              color={theme().white}
              size={14}
            />
          </View>
          <CText
            value={`Hold  Qty   ${item.holdQty}`}
            color={theme().white}
            size={14}
          />
        </View>
      </>

    );
  };
  return (
    <>
      <CHeader
        title={'My Products'}
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
                <Text>No Products</Text>
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

export default MyProducts;
