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
import Loader from '../../components/Loader';
import { getApiData } from '../../config/apiHelper';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import BaseSetting from '../../config/settings';
import { FontFamily } from '../../config/typography';
import styles from './styles';

export default function ShoppingBag({ navigation }) {
  const { userData } = useSelector((state) => state.auth);

  const [itemList, setitemList] = useState([]);
  const [loader, setloader] = useState(false);
  const [subTotal, setsubTotal] = useState(0);

  const [SummaryData, setSummaryData] = useState({});

  const [showQuantity, setshowQuantity] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [modifiedItem, setmodifiedItem] = useState({});

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
  }, []);

  const GetCartItemList = () => {
    setloader(true);
    const url =
      // BaseSetting.api +
      `http://103.253.15.102:88/main_api/api/cartItemList?siteCode=${userData?.siteCode}&phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}`;
    console.log(
      '🚀 ~ file: index.js ~ line 39 ~ GetCartItemList ~ userData?.customerCode',
      url,
    );

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(
          '🚀 ~ file: index.js ~ line 28 ~ .then ~ result GetCartItemList',
          result,
        );
        if (result?.success == 1) {
          if (result.result) {
            setitemList(result?.result);
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
    const url = `http://103.253.15.102:88/main_api/api/cartSummary?siteCode=${userData?.siteCode}&phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log('🚀 ~ file: shopping bag.js ~ line 134 ~ result', result);
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

  const onDeleteItem = (item) => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: item?.itemCode,
      itemDescription: item?.itemDescription,
      itemQuantity: item?.itemQuantity,
      itemPrice: item?.itemPrice,
      siteCode: userData?.siteCode,
    };

    getApiData(BaseSetting?.endpoints?.cartItemDelete, 'post', data)
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
    return (
      <View style={styles.itemCont}>
        <Image
          source={item?.imageUrl ? { uri: item?.imageUrl } : Images?.logo}
          style={{ height: 90, width: 90, borderRadius: 8 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginStart: 12 }}>
          <CText
            value={item?.itemName}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
            color={BaseColor.amberTxt}
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
                  color={BaseColor.amberTxt}
                /> */}

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
                      tintColor: BaseColor.amberTxt,
                    }}
                    resizeMode="center"
                    source={Icons.drop_icon}
                  />
                </TouchableOpacity>
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
                  color={BaseColor.amberTxt}
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
        title={t('shoppingBag')}
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
            <CText value={t('haveDicoundCode')} size={14} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                backgroundColor: BaseColor.white,
                alignSelf: 'center',
                padding: 4,
                borderRadius: 40,
                paddingHorizontal: 8,
                marginTop: 8,
              }}>
              <Image
                source={Images.goals}
                style={{ height: 22, width: 22 }}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Enter Here"
                placeholderTextColor={'#A3A3A3'}
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  fontSize: 14,
                  fontFamily: FontFamily.Poppins_Regular,
                  color: BaseColor.black,
                }}
              />
              <View
                style={{
                  height: 38,
                  width: 38,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: BaseColor.amber,
                }}>
                <Image
                  source={Icons.right_arrow}
                  style={{ height: '40%', width: '40%' }}
                  resizeMode="contain"
                  tintColor={BaseColor.darkGrey}
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: BaseColor.white50,
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
                color={BaseColor.white}
              />
              <CText
                value={`$${subTotal}`}
                size={20}
                fontFamily={FontFamily.Poppins_Medium}
                color={BaseColor.amberTxt}
              />
            </View>

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
          </>
        )}
      </View>
      <Loader loader={loader} />

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
              backgroundColor: '#fff',
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
                      borderColor: BaseColor.black,
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
                      color={BaseColor.black}
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
