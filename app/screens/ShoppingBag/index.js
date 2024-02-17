import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  FlatList,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import CLoader from '../../components/CLoader';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import BaseSetting, { baseUrl } from '../../config/settings';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import { useIsFocused } from '@react-navigation/core';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

export default function ShoppingBag({ navigation }) {
  const isFocused = useIsFocused();
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.theme.theme);

  const [itemList, setitemList] = useState([]);
  const [loader, setloader] = useState(false);
  const [subTotal, setsubTotal] = useState(0);

  const [SummaryData, setSummaryData] = useState({});

  const [showQuantity, setshowQuantity] = useState(false);
  const [isAppointmentCart, setIsAppointmentCart] = useState(false);

  const [selectedQuantity, setselectedQuantity] = useState(1);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [modifiedItem, setmodifiedItem] = useState({});
  const { clientDetails } = useSelector((state) => state.auth);
  const [cardId, setCardID] = useState(0);
  let isHitPayPayment = clientDetails.hitpayApiKey.length > 1 ? true : false;
  const AddToCart = (item, iQty) => {
    console.log('Item>>>Line>>46>>', '' + item);

    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: item?.itemCode,
      itemDescription: item?.itemDescription,
      itemQuantity: iQty,
      itemPrice: item?.price,
      siteCode: userData?.siteCode,
      redeemPoint: '0',
      itemType: 1,
    };
    getApiData(BaseSetting?.endpoints?.cartItemInput, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 33 ~ .then ~ result', result);
        if (result?.success == 1) {
          //navigation.goBack();
          // navigation.navigate('ShoppingScreen');
          GetCartItemList();
          CartSummary();
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 35 ~ .then ~ err', err);
      });
  };

  useEffect(() => {
    GetCartItemList();
    CartSummary();
  }, [isFocused]);

  const GetCartItemList = () => {
    setloader(true);
    const url =
      // BaseSetting.api +
      `${baseUrl}api/cartItemList?siteCode=${userData?.siteCode}&phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}`;


    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success == 1) {
          if (result.result) {
            setitemList(result?.result);
            setCardID(result?.result[0].cardId);
          } else {
            setitemList([]);
          }
        } else {
          setitemList([]);
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });

    // getApiData(url, 'get', {})
    //   .then((result) => {
    //     console.log(
    //       '🚀 ~ file: index.js ~ line 28 ~ .then ~ result GetCartItemList',
    //       result,
    //     );
    //     if (result?.success == 1) {
    //       setitemList(result?.result);
    //     }
    //     setloader(false);
    //   })
    //   .catch((err) => {
    //     setloader(false);
    //     console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
    //   });
  };

  const CartSummary = () => {
    const url = `${baseUrl}api/cartSummary?siteCode=${userData?.siteCode}&phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success == 1) {
          if (result?.result) {
            setSummaryData(result?.result[0]);
            setsubTotal(result?.result[0]?.subTotal);
          } else {
            setSummaryData({});
            setsubTotal(0);
          }
        } else {
          setSummaryData({});
          setsubTotal(0);
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });

    // getApiData(url, 'get', {})
    //   .then((result) => {
    //     console.log(
    //       '🚀 ~ file: index.js ~ line 28 ~ .then ~ result CartSummary',
    //       result,
    //     );
    //     if (result?.success == 1) {
    //       setSummaryData(result?.result[0]);
    //       setsubTotal(result?.result[0]?.subTotal);
    //     }
    //     setloader(false);
    //   })
    //   .catch((err) => {
    //     setloader(false);
    //     console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
    //   });
  };


  const appAppointmentBookingFromCart = () => {
    const request = {
      cartId: cardId,
      paymentMethod: isHitPayPayment ? "HitPay" : "PayAtOutlet"
    };
    console.log('appAppointmentBookingFromCart - Request Section', request);

    getApiData(BaseSetting.endpoints.appAppointmentBookingFromCart, 'post', request)
      .then((result) => {
        console.log('appAppointmentBookingFromCart - Response Section', result);
        if (result?.success == 1) {
          if (isHitPayPayment) {
            payNow();
          }
          else {
            Toast.show(result?.result);
            navigation.navigate('BottomTabsNavigator');
          }
        }
        if (result?.success == 0) {
          Alert.alert('Error', result?.error);
        }
      })
      .catch((err) => {
        console.log('appAppointmentBookingFromCart - Error Section', err);
      });
  };



  const payNow = () => {

    const hitpayrequest = {
      amount: subTotal,
      email: userData?.email,
      phoneNumber: userData?.customerPhone,
      purpose: 'Payment for Book Appointment',
    };
    const customerCode = userData?.customerCode;

    const hitPayBookAppointmentRequest = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode
    };
    navigation.navigate('HitPay', { hitpayrequest, customerCode, hitPayBookAppointmentRequest });
  }
  const onDeleteItem = (item) => {
    setloader(true);
    const request = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: item?.itemCode,
      itemDescription: item?.itemDescription,
      itemQuantity: item?.itemQuantity,
      itemPrice: item?.itemPrice,
      siteCode: userData?.siteCode,
    };
    console.log("cartItemDelete : ", request)
    getApiData(BaseSetting?.endpoints?.cartItemDelete, 'post', request)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 59 ~ .then ~ result', result);
        if (result?.success == 1) {
          GetCartItemList();
          CartSummary();
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 62 ~ .then ~ err', err);
      });
  };

  const renderItem = ({ item, index }) => {
    const hasApptDate = item && item.apptDate;
    setIsAppointmentCart(hasApptDate);

    return (
      <View style={styles.itemCont}>
        <Image
          source={
            item?.imageUrl.includes('http')
              ? { uri: item?.imageUrl }
              : clientDetails?.clientLogo
          }
          style={{ height: 110, width: 90, borderRadius: 8 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginStart: 12 }}>
          <CText
            value={item?.itemName}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
            color={theme().amberTxt}
          />
          <CText
            value={moment((item?.apptDate), 'DD/MM/YYYY hh:mm:ss A').format('DD/MMM/YYYY') + " " + item?.apptFrTime}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
            color={theme().amberTxt}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ justifyContent: 'space-between' }}>

              <View>
                <CText value="Quantity" size={10} />
                {/* <CText
                  value={item?.itemQuantity}
                  size={14}
                  color={theme().amberTxt}
                /> */}
                {hasApptDate ? (
                  <TouchableOpacity
                    style={styles.dropCont}
                    activeOpacity={0.7}>
                    <Text style={styles.dropValue}>{item?.itemQuantity}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.dropCont}
                    activeOpacity={0.7}
                    onPress={() => {
                      // Alert.alert(`Item qty> ${item?.itemQuantity}`);

                      setmodifiedItem(item);
                      setshowQuantity(true);
                    }}>
                    <Text style={styles.dropValue}>{item?.itemQuantity}</Text>
                    <Image
                      style={{
                        height: 16,
                        width: 16,
                        tintColor: theme().amberTxt,
                      }}
                      resizeMode="center"
                      source={Icons.drop_icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* <Image
                source={Icons.checked}
                style={{ height: 14, width: 14 }}
                resizeMode="contain"
              /> */}
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginEnd: 16,
              }}>
              <View>
                <CText value="Price" size={10} style={{ textAlign: 'right' }} />
                <CText
                  value={`$${item.itemPrice * item?.itemQuantity}`}
                  size={14}
                  color={theme().amberTxt}
                  style={{ textAlign: 'right' }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  padding: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  onDeleteItem(item);
                }}>
                <Image
                  source={Icons.delete}
                  style={{ height: 18, width: 18 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={t('cart')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <CText
          value={t('itemCartTxt')}
          size={14}
          style={{ textAlign: 'center' }}
        />
        <FlatList data={itemList} renderItem={renderItem} />
        {!!subTotal && (
          <>

            <View
              style={{
                height: 1,
                backgroundColor: theme().white50,
                marginVertical: 24,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <CText
                value={t('subtotal')}
                size={20}
                fontFamily={FontFamily.Poppins_Medium}
                color={theme().white}
              />
              <CText
                value={`$${subTotal}`}
                size={20}
                fontFamily={FontFamily.Poppins_Medium}
                color={theme().amberTxt}
              />
            </View>
            {isAppointmentCart ? (
              <View style={{
                flexDirection: 'row', justifyContent: 'space-around',
                padding: 4
              }}>
                < CButton
                  title={t('Add More')}
                  style={{ marginBottom: 2, flex: 1 }}
                  onPress={() => navigation?.navigate('BookingScreenNew', {})}
                />
                <CButton
                  title={isHitPayPayment ? t('Pay Now') : t('Pay At Outlet')}
                  style={{ marginLeft: 2, flex: 1 }}
                  onPress={() => appAppointmentBookingFromCart()}
                />
              </View>
            ) : (
              <CButton
                title={t('placeOrder')}
                style={{ maringTop: 16 }}
                onPress={() =>
                  navigation.navigate('Checkout', {
                    data: itemList,
                    subTotal,
                    orderSummary: SummaryData,
                  })
                }
              />
            )}
          </>
        )}
      </View >
      <CLoader loader={loader} />

      <Modal style={{ flex: 1 }} transparent visible={showQuantity}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000070',
          }}>
          <View
            style={{
              height: 350,
              backgroundColor: currentTheme !== 'Dark' ? 'black' : 'white',
              width: '90%',
              borderRadius: 8,
            }}>
            <FlatList
              data={quantity}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      borderBottomWidth: 1,
                      borderColor: theme().black,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setshowQuantity(false);
                      setselectedQuantity(item);
                      //Alert.alert(`item>${item},${selectedQuantity}`);
                      AddToCart(modifiedItem, item);
                    }}>
                    <CText
                      value={item}
                      color={theme().black}
                      size={20}
                      fontFamily={FontFamily.Poppins_Medium}
                      style={{
                        textAlign: 'center',
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
