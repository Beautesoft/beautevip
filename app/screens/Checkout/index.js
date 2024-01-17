import { isArray, split } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import BaseSetting, { baseUrl } from '../../config/settings';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import { CreditCardInput } from 'react-native-credit-card-input-view';
import Toast from 'react-native-simple-toast';
import CLoader from '../../components/CLoader';
import moment from 'moment';
import { t } from 'i18next';

export default function Checkout({ navigation, route }) {
  const styles = styledFunc();
  const productList = route?.params?.data;
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ Checkout ~ productList',
    productList,
  );
  const subTotal = route?.params?.subTotal;
  const orderSummary = route?.params?.orderSummary;

  const { userData } = useSelector((state) => state.auth);
  const [addressArr, setaddressArr] = useState([]);
  const [shoppingAddress, setshoppingAddress] = useState();
  const [cardType, setcardType] = useState('');

  const [customerStripeID, setcustomerStripeID] = useState('');
  const [intentStripeID, setintentStripeID] = useState('');

  const [selectedDeliveryType, setselectedDeliveryType] = useState(1);

  const [cardInputModal, setcardInputModal] = useState(false);
  const [cardObj, setcardObj] = useState({});

  const [loader, setloader] = useState(false);

  useEffect(() => {
    GetAddress();
  }, []);

  const GetAddress = () => {
    const addressType = 'Shipping';
    // const url = `/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=${addressType}&siteCode=${userData?.siteCode}`;
    const url = `${baseUrl}api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;
    console.log('🚀 ~ file: index.js ~ line 45 ~ GetAddress ~ url', url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setaddressArr(json?.result);

        if (isArray(json?.result)) {
          json?.result?.map((item) => {
            if (item?.isDefaultAddress == true) {
              setshoppingAddress(item);
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StripeCustomerCreate = () => {
    setloader(true);

    const data = {
      customerName: userData?.customerName,
      customerEmail: userData?.email,
      customerPhone: userData?.customerPhone,
    };
    console.log('StripeCustomerCreate');

    getApiData(BaseSetting.endpoints.stripeCustomerCreate, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 86 ~ .then ~ result', result);
        if (result?.success == 1) {
          setcustomerStripeID(result?.result?.id);
          StripePaymentIntentCreate(result?.result?.id);
        }
        //setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        setloader(false);
      });
  };

  const StripePaymentIntentCreate = (customerId) => {
    setloader(true);
    console.log('inside StripePaymentIntentCreate--->');
    const data = {
      customerId: customerId,
      customerCode: userData?.customerCode,
      amount: subTotal,
      currency: 'sgd',
    };
    console.log('StripePaymentIntentCreate data', data);

    getApiData(BaseSetting.endpoints.stripePaymentIntentCreate, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 114 ~ .then ~ result', result);
        setloader(false);
        if (result?.success == 1) {
          setintentStripeID(result?.result?.id);
          setTimeout(() => {
            setcardInputModal(true);
          }, 100);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        setloader(false);
      });
  };

  const StripePaymentIntentConfirm = () => {
    setloader(true);

    const data = {
      cardNumber: cardObj?.number,
      expMonth: cardObj?.exp_month,
      expYear: cardObj?.exp_year,
      cvc: cardObj?.cvc,
      paymentIntentId: intentStripeID,
      transactionId: productList[0]?.cardId,
      paymentType: 'Credit Card',
    };
    console.log(
      '🚀 ~ file: index.js ~ line 140 ~ StripePaymentIntentConfirm ~ data',
      data,
    );

    getApiData(BaseSetting.endpoints.stripePaymentIntentConfirm, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 143 ~ .then ~ result', result);
        if (result?.success == 1) {
          appTransPostSales();
          setcardInputModal(false);
        } else {
          Toast.show(result?.error);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        setloader(false);
      });
  };

  const appTransPostSales = () => {

    let tempArr = [];
    productList.map((item, index) => {
      tempArr.push({
        lineNumber: index + 1,
        lineStatus: 'SA',
        lineType: item?.itemType === 1 ? 'PRODUCT' : 'SERVICE',
        itemCode: item?.itemCode,
        itemName: item?.itemName,
        itemQty: item?.itemQuantity,
        balanceQty: 0,
        unitPrice: item?.itemPrice * item?.itemQuantity,
        unitDiscount: 0,
        promoPrice: item?.itemPrice * item?.itemQuantity,
        itemAmount: item?.itemPrice * item?.itemQuantity,
        salesAmount: item?.itemPrice * item?.itemQuantity,
        depositAmount: item?.itemPrice * item?.itemQuantity,
        gstAmountCollected: 0,
        staffcode: productList[0]?.cardId,
        isFOC: false,
        isFirstTreatmentDone: false,
        isHoldItem: true,
        holdItemQty: item?.itemQuantity,
      });
    });

    const data = {
      cartToken: productList[0]?.cardId,
      siteCode: userData?.siteCode,
      userID: userData?.customerName,
      // salesDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      salesDate: new Date(),
      salesStatus: 'SA',
      salesType: 'Receipt',
      totalQuantity: orderSummary?.totalCount,
      staffCode: productList[0]?.cardId,
      customerCode: userData?.customerCode,
      totalAmount: subTotal,
      totalDiscount: 0,
      totalGST: 0,
      depositAmount: subTotal,
      transactionDetails: tempArr,
      payDetails: [
        {
          lineNumber: '1',
          paymentGroup: 'CARD',
          paymentType: cardType == 'visa' ? 'VS' : 'MS',
          paymentDescription: cardType == 'visa' ? 'VISA' : 'MASTER',
          paymentAmount: subTotal,
          payActualAmount: subTotal,
          payChange: 0,
          payCurrency: 'SGD',
        },
      ],
    };
    console.log(
      '🚀 ~ file: index.js ~ line 206 ~ appTransPostSales ~ orderSummary?.totalCount',
      orderSummary?.totalCount,
    );

    getApiData(BaseSetting.endpoints.appTransPostSales, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 215 ~ .then ~ result', result);
        setloader(false);
        if (result?.success == 1) {
          Toast.show('Order confirmed');
          // navigation.navigate('BottomTabsNavigator');
          navigation.navigate('MyOrder', { resetFlow: true });
        }
        console.log('🚀 ~ file: index.js  ~ .then ~ loader', loader);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        setloader(false);
      });
  };

  return (
    <>
      <CHeader
        title={t('checkout')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CText value={t('shippingInfo')} size={14} color={'#B1B1B1'} />
          <View style={[styles.rowSty, { marginTop: 8 }]}>
            <CText
              value={shoppingAddress?.customerName || userData?.customerName}
              size={14}
              color={theme().amberTxt}
            />
            <CText
              value={shoppingAddress?.phoneNumber || userData?.customerPhone}
              size={14}
              color={theme().amberTxt}
            />
          </View>
          <CText
            value={shoppingAddress?.address || userData?.customerAddress}
            size={14}
            color={theme().amberTxt}
          />

          <CText
            value={t('selectDelType')}
            size={14}
            color={'#B1B1B1'}
            style={{ marginTop: 16 }}
          />
          <View style={[styles.rowSty, { marginTop: 8 }]}>
            <TouchableOpacity
              style={{
                borderRadius: 4,
                height: 100,
                width: 100,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor:
                  selectedDeliveryType == 1 ? theme().yellow : theme().black,
              }}
              activeOpacity={0.7}
              onPress={() => setselectedDeliveryType(1)}>
              <LinearGradient
                colors={['#27ED5F', '#007822']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <CText
                  value={t('free')}
                  size={20}
                  fontFamily={FontFamily.Poppins_Medium}
                />
                <CText
                  value={t('selfCollect')}
                  size={14}
                  fontFamily={FontFamily.Poppins_Regular}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <CText
            value="Item Summary"
            size={14}
            color={'#B1B1B1'}
            style={{ marginTop: 16 }}
          />

          {isArray(productList) &&
            productList.map((item) => {
              return (
                <View>
                  <CText
                    value={item?.itemName}
                    size={14}
                    color={theme().amberTxt}
                    style={{ marginTop: 16 }}
                  />
                  <View style={[styles.rowSty, { marginTop: 8 }]}>
                    <CText
                      value={`${t('quantity')}: ${item?.itemQuantity}`}
                      size={14}
                      color={'#b1b1b1'}
                    />
                    <CText
                      value={`$${item.itemPrice} x ${item?.itemQuantity} = $${
                        item.itemPrice * item?.itemQuantity
                      }`}
                      size={14}
                      color={theme().amberTxt}
                    />
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: theme().white60,
                      marginTop: 10,
                    }}
                  />
                </View>
              );
            })}
        </ScrollView>
        <CText
          value={`Total payable amount: $${subTotal}`}
          size={22}
          style={{
            paddingTop: 8,
            paddingBottom: 8,
          }}
          color={theme().amberTxt}
        />
        <CButton
          title={t('placeOrderNow')}
          onPress={() => {
            StripeCustomerCreate();
          }}
        />
      </View>
      <CLoader loader={loader} />

      <Modal
        style={{ flex: 1 }}
        transparent
        visible={cardInputModal}
        animationType="slide"
        onRequestClose={() => {
          if (!loader) {
            setcardInputModal(false);
          }
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#ffffff40',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
          onPress={() => {
            if (!loader) {
              setcardInputModal(false);
            }
          }}>
          <View
            style={{
              padding: 8,
              backgroundColor: theme().always_white,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '88%',
            }}>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 70,
                //left: 0,
              }}>
              <CreditCardInput
                onChange={(val) => {
                  const expMonth = split(val?.values?.expiry, '/')[0];
                  const expYear = split(val?.values?.expiry, '/')[1];

                  const tempObj = {
                    number: val?.values?.number,
                    exp_month: expMonth,
                    exp_year: 20 + expYear,
                    cvc: val?.values?.cvc,
                  };
                  console.log(
                    '🚀 ~ file: index.js ~ line 373 ~ productList.map ~ tempObj',
                    val?.values?.type,
                  );

                  setcardType(val?.values?.type);

                  setcardObj(tempObj);
                }}
                cardFontFamily={FontFamily.arial_bold}
                // validColor={theme().whiteColor}
                labelStyle={{ color: theme().black }}
                allowScroll={true}
              />
            </View>
            <CButton
              loader={loader}
              title={t('submit')}
              onPress={() => {
                StripePaymentIntentConfirm();
              }}
              style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? '55%' : '80%',
                width: '90%',
                marginBottom: 0,
                alignSelf: 'center',
                backgroundColor: theme().btnBlue,
              }}
              titleStyle={{
                color: theme().whiteColor,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
