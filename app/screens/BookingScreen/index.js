import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,

  Platform,

  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import { Modal } from 'react-native';//this is for android
import Modal from 'react-native-modals';//this is for ios

import LinearGradient from 'react-native-linear-gradient';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import styles from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Images } from '../../config/images';
import { enableAnimateInEaseOut } from '../../config/commonFunctions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { isEmpty, isArray, split } from 'lodash';
import { t } from 'i18next';
import { CreditCardInput } from 'react-native-credit-card-input';
import MyModal from '../../components/MyModal';



export default function BookingScreen({ navigation, route }) {
  const orderData = route?.params?.itemData;
  console.log(
    '🚀 ~ file: vk index.js ~ line 36 ~ BookingScreen ~ orderData',
    orderData,
  );

  const type = route?.params?.type;

  const packageType = type == 'package' ? true : false;

  const { userData } = useSelector((state) => state.auth);

  const [rateService, setrateService] = useState(false);
  const [expandLocation, setexpandLocation] = useState(false);
  const [expandTime, setexpandTime] = useState(false);
  const [expandBeaut, setexpandBeaut] = useState(false);
  const [selectedDateTime, setselectedDateTime] = useState();
  const [selectedDate, setselectedDate] = useState();

  const [location, setlocation] = useState([]);
  const [beauty, setbeauty] = useState();
  const [selectedLocation, setSelectedLoation] = useState();

  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  const [customerStripeID, setcustomerStripeID] = useState('');
  const [availableSlots, setavailableSlots] = useState([]);
  const [staffArr, setstaffArr] = useState([]);
  const [saloonList, setsaloonList] = useState([]);

  const [cardType, setcardType] = useState('');
  const [intentStripeID, setintentStripeID] = useState('');
  const [cardInputModal, setcardInputModal] = useState(false);

  const [cardObj, setcardObj] = useState({});

  const [cartItemList, setcartItemList] = useState([]);
  const [cardID, setcardID] = useState('');

  const [loader, setloader] = useState(false);


  const [visible, setVisible] = useState(false);


  const GetAddress = () => {
    const addressType = 'Shipping';
    // const url = `/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=${addressType}&siteCode=${userData?.siteCode}`;
    const url = `http://103.253.15.102:88/main_api/api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;
    console.log('🚀 ~ file: index.js ~ line 45 ~ GetAddress ~ url', url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setlocation(json?.result);
        console.log("VAddress:>", JSON.stringify(json));
      })
      .catch((error) => {

        console.error(error);
      });
  };


  const locationArr = [
    {
      image: Images.sampleOne,
      name: 'Location 1',
      txt: '12 abc, #01-23',
      loc: 'Singapore 012345',
    },
    {
      image: Images.sampleOne,
      name: 'Location 1',
      txt: '12 abc, #01-23',
      loc: 'Singapore 012345',
    },
    {
      image: Images.sampleOne,
      name: 'Location 1',
      txt: '12 abc, #01-23',
      loc: 'Singapore 012345',
    },
    {
      image: Images.sampleOne,
      name: 'Location 1',
      txt: '12 abc, #01-23',
      loc: 'Singapore 012345',
    },
  ];

  const beautyArr = [
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
    {
      title: 'Suzzaine',
      image: Images.sampleOne,
    },
  ];

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

  const renderTimeSlots = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ padding: 8, alignItems: 'center' }}
        onPress={() => {
          setexpandTime(false);
          setselectedDateTime(item);
          console.log(
            '🚀 ~ file: index.js ~ line 148 ~ renderTimeSlots ~ item',
            item,
          );
        }}>
        <Text style={{ color: BaseColor.white90 }}>{item?.time}</Text>
      </TouchableOpacity>
    );
  };

  const renderLocation = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.locCont}
        activeOpacity={0.7}
        onPress={() => {
          setSelectedLoation(item);
          setexpandLocation(false);
        }}>
        <Image
          source={
            item?.displayPic ? { uri: item?.displayPic } : Images.sampleOne
          }
          style={{ height: 70, width: 70, borderRadius: 10 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginStart: 8 }}>
          <CText
            value={item?.siteName}
            size={14}
            color={BaseColor.amberTxt}
            fontFamily={FontFamily.Poppins_Medium}
          />
          <CText
            value={item?.siteCode}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
          <CText
            value={item?.Location}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderBeauty = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.beautyCont}
        activeOpacity={0.7}
        onPress={() => {
          setbeauty(item);
          setexpandBeaut(false);
        }}>
        <Image
          source={item?.profilePic ? { uri: item?.profilePic } : Images.logo}
          style={{ height: 42, width: 36, borderRadius: 60 }}
          resizeMode="cover"
        />
        <CText
          value={`${item?.displayName}`}
          size={10}
          fontFamily={FontFamily.Poppins_Medium}
          style={{
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  const checkIfSlotAvaillable = () => {
    //setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: packageType
        ? orderData?.packageList[0].itemCode
        : orderData?.itemCode,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
      appointmentTime: selectedDateTime?.timeIn24Hrs,
      appointmentDuration: packageType
        ? Number(orderData?.packageList[0].duration)
        : orderData?.duration,
      siteCode: selectedLocation.siteCode,//userData?.siteCode,
      itemName: packageType ? orderData?.packageName : orderData?.itemName,
      treatmentId: packageType ? orderData?.packageID : '',
      appointmentRemark: "TNC",
      staffCode: beauty?.staffCode,
      appointmentItemDetails: [
        {
          lineNumber: "1",
          itemCode: packageType
            ? orderData?.packageList[0].itemCode
            : orderData?.itemCode,
          itemName: packageType ? orderData?.packageName : orderData?.itemName,
          unitPrice: packageType ? orderData?.unitPrice : orderData?.price
        }
      ]
    }
    console.log('🚀 ~ line 290~ ', data);


    getApiData(BaseSetting.endpoints.checkAppointmentSlot, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 188 ~ .then ~ result', result);
        if (result?.success == 1) {
          Toast.show("Slot availlable, proceed to payment.");

          if (packageType) {
            //Toast.show("Book appointment.");
            BookAppointment();

          } else {
            //Toast.show("cart all item.");
            // StripeCustomerCreate();
            cartAllItemDelete();
          }


        } else {
          //Toast.show(result?.error);
          Alert.alert("Message", result?.error);
        }

      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 190 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        //setloader(false);
      });



  }




  const BookAppointment = () => {
    //setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: packageType
        ? orderData?.packageList[0].itemCode
        : orderData?.itemCode,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
      appointmentTime: selectedDateTime?.timeIn24Hrs,
      appointmentDuration: packageType
        ? Number(orderData?.packageList[0].duration)
        : orderData?.duration,
      siteCode: selectedLocation.siteCode,//userData?.siteCode,
      itemName: packageType ? orderData?.packageName : orderData?.itemName,
      treatmentId: packageType ? orderData?.packageID : '',
      appointmentRemark: '',
      staffCode: beauty?.staffCode,
      appointmentItemDetails: [
        {
          lineNumber: '1',
          itemCode: packageType
            ? orderData?.packageList[0].itemCode
            : orderData?.itemCode,
          itemName: packageType ? orderData?.packageName : orderData?.itemName,
          unitPrice: packageType ? orderData?.unitPrice : orderData?.price,
        },
      ],
    };
    console.log('🚀 ~ file: index.js ~ line 372 ~ ', data);
    getApiData(BaseSetting.endpoints.bookAppointment, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 188 ~ .then ~ result', result);
        if (result?.success == 1) {
          Toast.show('Appointment Booked');
          navigation.navigate('BottomTabsNavigator');
        } else {
          Toast.show(result?.error);
        }

      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 190 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        //setloader(false);
      });
  };

  useEffect(() => {

    //setcardInputModal(false);
    // AvailableSlots();
    GetAddress();
    GetStaffMemberList();
    GetSaloonList();
  }, []);

  const AvailableSlots = (date) => {
    setloader(true);
    const data = {
      slotDate: date,
    };

    getApiData(BaseSetting.endpoints.availableSlots, 'post', data)
      .then((result) => {
        setavailableSlots(result?.result);

        setTimeout(() => {
          setexpandTime(true);
          setloader(false);
        }, 1000);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 213 ~ .then ~ err', err);
      });
  };

  const GetStaffMemberList = () => {
    const data = {
      SiteListing: [
        {
          siteCode: userData?.siteCode,
        },
      ],
      staffName: '',
      staffCode: '',
      userID: '',
      siteCode: userData?.siteCode,
      isActive: '1',
    };
    console.log("line>>349>>", data);

    getApiData(BaseSetting.endpoints.getStaffMemberList, 'post', data)
      .then((result) => {
        const filterList = !isEmpty(result?.result)
          ? result?.result.filter((item) => item?.showInAppt == true)
          : [];
        console.log(
          '🚀 ~ file: index.js ~ line 300 ~ .then ~ filterList',
          filterList,
        );
        setstaffArr(filterList);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 213 ~ .then ~ err', err);
      });
  };

  const GetSaloonList = () => {
    const url = `http://103.253.15.102:88/main_api/api/getSaloonList?siteCode=&userID=&hq=0`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("🚀 line 371>", json);
        setsaloonList(json?.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StripeCustomerCreate = () => {
    //setloader(true);
    const data = {
      customerName: userData?.customerName,
      customerEmail: userData?.email,
      customerPhone: userData?.customerPhone,
    };

    getApiData(BaseSetting.endpoints.stripeCustomerCreate, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 83 ~ .then ~ result', result);
        if (result?.success == 1) {
          setcustomerStripeID(result?.result?.id);
          StripePaymentIntentCreate(result?.result?.id);
        }

      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        //setloader(false);
      });
  };

  const StripePaymentIntentCreate = (customerId) => {
    console.log("inside StripePaymentIntentCreate");
    //setloader(true);

    const data = {
      customerId: customerId,
      customerCode: userData?.customerCode,
      amount: orderData?.price,
      currency: 'usd',
    };

    getApiData(BaseSetting.endpoints.stripePaymentIntentCreate, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 114 ~ .then ~ result', result);
        //setloader(false);
        if (result?.success == 1) {
          setintentStripeID(result?.result?.id);
          setTimeout(() => {
            setcardInputModal(true);
            setVisible(true);
          }, 500);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        //setloader(false);
      });
  };

  const StripePaymentIntentConfirm = () => {
    //setloader(true);

    const data = {
      cardNumber: cardObj?.number,
      expMonth: cardObj?.exp_month,
      expYear: cardObj?.exp_year,
      cvc: cardObj?.cvc,
      paymentIntentId: intentStripeID,
      transactionId: cardID,
      paymentType: 'Credit Card',
    };
    console.log(
      '🚀 ~ file: index.js ~ line 140 ~ StripePaymentIntentConfirm ~ data',
      data,
    );

    getApiData(BaseSetting.endpoints.stripePaymentIntentConfirm, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 143 ~ .then ~ result', result);
        if (result?.success == 1) {
          appTransPostSales();

        } else {
          Toast.show(result?.error);
        }

      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        //setloader(false);
      });
  };

  const cartAllItemDelete = () => {
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      siteCode: userData?.siteCode,
    };

    getApiData(BaseSetting.endpoints.cartAllItemDelete, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 448 ~ .then ~ result', result);
        if (result?.success == 1) {
          AddToCart();
        }
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: index.js ~ line 451 ~ cartAllItemDelete ~ err',
          err,
        );
      });
  };

  const AddToCart = () => {
    //setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: orderData?.itemCode,
      itemDescription: orderData?.itemDescription,
      itemQuantity: 1,
      itemPrice: orderData?.price,
      siteCode: userData?.siteCode,
      redeemPoint: '0',
      itemType: 3,
    };
    getApiData(BaseSetting?.endpoints?.cartItemInput, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 33 ~ .then ~ result', result);
        if (result?.success == 1) {
          getCartItems();
        }

      })
      .catch((err) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 35 ~ .then ~ err', err);
      });
  };

  const getCartItems = () => {
    //setloader(true);
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
        //setloader(false);
        console.log(
          '🚀 ~ file: index.js ~ line 28 ~ .then ~ result GetCartItemList',
          result,
        );
        if (result?.success == 1) {
          setcartItemList(result?.result);
          setcardID(result?.result[0]?.cardId);
          StripeCustomerCreate();
        }

      })
      .catch((err) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };

  const appTransPostSales = () => {
    //setloader(true);

    let tempArr = [];

    tempArr.push({
      lineNumber: 1,
      lineStatus: 'SA',
      lineType: 'SERVICE',
      itemCode: orderData?.itemCode,
      itemName: orderData?.itemName,
      itemQty: 1,
      balanceQty: 0,
      unitPrice: orderData?.price,
      unitDiscount: 0,
      promoPrice: orderData?.price,
      itemAmount: orderData?.price,
      salesAmount: orderData?.price,
      depositAmount: orderData?.price,
      gstAmountCollected: 0,
      staffcode: beauty?.staffCode,
      isFOC: false,
      isFirstTreatmentDone: false,
      isHoldItem: false,
    });

    const data = {
      cartToken: cardID,
      siteCode: userData?.siteCode,
      userID: userData?.customerName,
      // salesDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      salesDate: new Date(),
      salesStatus: 'SA',
      salesType: 'Receipt',
      totalQuantity: orderData?.price,
      staffCode: beauty?.staffCode,
      customerCode: userData?.customerCode,
      totalAmount: orderData?.price,
      totalDiscount: 0,
      totalGST: 0,
      depositAmount: orderData?.price,
      transactionDetails: tempArr,
      payDetails: [
        {
          lineNumber: '1',
          paymentGroup: 'CARD',
          paymentType: cardType == 'visa' ? 'VS' : 'MS',
          paymentDescription: cardType == 'visa' ? 'VISA' : 'MASTER',
          paymentAmount: orderData?.price,
          payActualAmount: orderData?.price,
          payChange: 0,
          payCurrency: 'US',
        },
      ],
    };

    getApiData(BaseSetting.endpoints.appTransPostSales, 'post', data)
      .then((result) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 215 ~ .then ~ result', result);
        if (result?.success == 1) {
          Toast.show('Order confrimed');
          BookAppointment();
        } else {
          Toast.show(result?.error);
        }

      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 64 ~ .then ~ err', err);
        //setloader(false);
      });
  };

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('booking')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled> */}
        <View style={styles.topPart}>
          <View
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              height: 60,
              width: 60,
            }}>
            <LinearGradient
              colors={['#806306', '#594000']}
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              style={styles.llCont}>
              <Image
                source={Icons.mail}
                style={{ height: 60, width: 60 }}
                resizeMode="contain"
                tintColor={BaseColor.black}
              />
            </LinearGradient>
          </View>
          <View style={{ paddingStart: 8, flex: 1 }}>
            <CText
              value={packageType ? orderData?.packageName : orderData?.itemName}
              color={BaseColor.amberTxt}
              size={20}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            {orderData?.duration && (
              <CText
                value={`${orderData?.duration} min`}
                color={BaseColor.amberTxt}
                size={18}
                fontFamily={FontFamily.Poppins_Regular}
              />
            )}
            {orderData?.price && (
              <CText
                value={`S$ ${orderData?.price}`}
                color={BaseColor.amberTxt}
                size={18}
                fontFamily={FontFamily.Poppins_Regular}
              />
            )}
          </View>
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 4 }}>
          {/* <CText value={t('addAppDetail')} color={BaseColor.white} size={14} /> */}
          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              setexpandBeaut(false);
              setexpandTime(false);
              setisDatePickerVisible(false);
              setexpandLocation(!expandLocation);
              //GetAddress();
            }}>
            <Text style={styles.btnTxt}>
              {selectedLocation ? selectedLocation?.siteName : t('selectLocation')}
            </Text>
            {expandLocation && (
              <View style={{ height: 300, width: '100%', paddingTop: 12 }}>
                <FlatList
                  data={saloonList}
                  keyExtractor={(item, index) => index}
                  renderItem={renderLocation}
                  contentContainerStyle={{
                    width: '100%',
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              setexpandBeaut(false);
              setexpandLocation(false);

              setisDatePickerVisible(true);

              // setexpandTime(!expandTime);
            }}>
            <Text style={styles.btnTxt}>
              {selectedDateTime?.time
                ? `${moment(selectedDate).format('YYYY-MM-DD')} ${selectedDateTime?.time
                }`
                : t('setDateTime')}
            </Text>
            {expandTime && (
              <View style={{ height: 300, width: '100%', paddingTop: 12 }}>
                <FlatList
                  data={availableSlots}
                  keyExtractor={(item, index) => index}
                  renderItem={renderTimeSlots}
                  contentContainerStyle={{
                    width: '100%',
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              setexpandTime(false);
              setexpandLocation(false);
              setisDatePickerVisible(false);
              setexpandBeaut(!expandBeaut);
            }}>
            <Text style={styles.btnTxt}>
              {beauty
                ? `${beauty?.firstName} ${beauty?.lastName}`
                : t('selectAvail')}
            </Text>

            {expandBeaut && (
              <View style={{ height: 160, width: '100%', paddingTop: 12, marginBottom: '10%' }}>
                <FlatList
                  data={staffArr}
                  keyExtractor={(item, index) => index}
                  renderItem={renderBeauty}
                  contentContainerStyle={{
                    width: '100%',

                  }}
                  numColumns={4}
                  showsVerticalScrollIndicator={true}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}

        {beauty && selectedLocation && selectedDateTime ? (
          <CButton
            title="Book Now"
            onPress={() => {

              console.log('🚀 ~sCode>', userData?.siteCode);
              if (userData?.customerCode === 'CUSTAPP001') {
                navigation.navigate('Login');
              } else {
                checkIfSlotAvaillable();
              }

              // if (packageType) {
              //   BookAppointment();

              // } else {
              //   // StripeCustomerCreate();
              //   cartAllItemDelete();
              // }
            }}
          />
        ) : null}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={(new Date((new Date().getTime() + (24 * 60 * 60 * 1000) * 1)))}
        maximumDate={(new Date((new Date().getTime() + ((24 * 60 * 60 * 1000) * 365))))}
        onConfirm={(val) => {
          if (val.getDay() === new Date().getDay()) {
            console.log(
              '🚀 ~VskingMatched>>>',
              val.getDay(), new Date().getDay()
            );
            setselectedDate((new Date((new Date().getTime() + (24 * 60 * 60 * 1000) * 1))));
          } else {
            console.log(
              '🚀 ~VskingNotMatched>>>',
              val.getDay(), new Date().getDay()
            );
            setselectedDate(val);
          }


          AvailableSlots(val);
          setisDatePickerVisible(false);

          console.log(
            '🚀 ~ file: index.js ~ line 266 ~ BookingScreen ~ val Vk>>',
            val + "," + (new Date((new Date().getTime() + 24 * 60 * 60 * 1000))), moment().add(2, 'days')
          );

        }}
        onCancel={() => {
          setisDatePickerVisible(false);
        }}
      />
      <CLoader loader={loader} />




      {Platform.OS === 'ios' ?

        <View>
          <Modal
            style={{
              flex: 1,
              backgroundColor: '#ffffff40'
            }}
            transparent
            visible={cardInputModal}
            animationType="slide"
            onRequestClose={() => setcardInputModal(false)}
          //onBackdropPress={() => setcardInputModal(false)}
          //onSwipeComplete={() => setcardInputModal(false)}

          >

            <TouchableOpacity
              activeOpacity={1}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#ffffff40',
              }}
              onPress={() => {
                setcardInputModal(false);
                //setTimeout(() => setcardInputModal(false), Platform.OS === "ios" ? 200 : 0);
              }}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: BaseColor.white,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
                  paddingVertical: 32,
                  paddingBottom: 8,
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
                  // validColor={BaseColor.whiteColor}
                  labelStyle={{ color: BaseColor.black }}
                  allowScroll={true}
                />
                <CButton
                  title={t('submit')}
                  onPress={() => {
                    setcardInputModal(false);
                    StripePaymentIntentConfirm();
                  }}
                  style={{
                    marginTop: 24,
                    margin: 16,
                    marginBottom: '75%',
                    backgroundColor: BaseColor.btnBlue,
                  }}
                  titleStyle={{
                    color: BaseColor.whiteColor,
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        :

        <MyModal
          visible={cardInputModal}
          onPressClose={() => {
            setcardInputModal(false);
          }}
          onCreditInput={(val) => {
            const expMonth = split(val?.values?.expiry, '/')[0];
            const expYear = split(val?.values?.expiry, '/')[1];

            const tempObj = {
              number: val?.values?.number,
              exp_month: expMonth,
              exp_year: 20 + expYear,
              cvc: val?.values?.cvc,
            };

            setcardType(val?.values?.type);

            setcardObj(tempObj);
          }}
          onSubmit={() => {
            StripePaymentIntentConfirm();
          }}
        >
        </MyModal>


      }
      {/* this is for android */}
      {/* <Modal
        style={{ flex: 1 }}
        transparent
        visible={cardInputModal}
        animationType="slide"
        onRequestClose={() => {
          setcardInputModal(false);
          console.log("Request modal closed...");
        }}
        >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#ffffff40',
          }}
          onPress={() => {
            setcardInputModal(false);
            setTimeout(() => {
              
            }, 500);
            console.log("Pressed modal  closed...");
          }}>
          <View
            style={{
              padding: 8,
              backgroundColor: BaseColor.white,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
              paddingVertical: 32,
              paddingBottom: 8,
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

                setcardType(val?.values?.type);

                setcardObj(tempObj);
              }}
              cardFontFamily={FontFamily.arial_bold}
              // validColor={BaseColor.whiteColor}
              labelStyle={{ color: BaseColor.black }}
              allowScroll={true}
              
            />
            <CButton
              title={t('submit')}
              onPress={() => {
                //setcardInputModal(false);
                StripePaymentIntentConfirm();
              }}
              style={{
                marginTop: 24,
                margin: 16,
                marginBottom: '75%',
                backgroundColor: BaseColor.btnBlue,
              }}
              titleStyle={{
                color: BaseColor.whiteColor,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal> */}

      {/* <MyModal 
      visible={cardInputModal}
      onPressClose={() => {
        setcardInputModal(false);
      }}
      onCreditInput={(val) => {
        const expMonth = split(val?.values?.expiry, '/')[0];
                const expYear = split(val?.values?.expiry, '/')[1];

                const tempObj = {
                  number: val?.values?.number,
                  exp_month: expMonth,
                  exp_year: 20 + expYear,
                  cvc: val?.values?.cvc,
                };

                setcardType(val?.values?.type);

                setcardObj(tempObj);
      }}
      onSubmit={()=>{
        StripePaymentIntentConfirm();
      }}
      >
      </MyModal> */}


      {/* this is for ios */}
      {/* <View>
     <Modal
        style={{ flex: 1,
          backgroundColor: '#ffffff40'
        }}
        transparent
        visible={cardInputModal}
        animationType="slide"
        onRequestClose={() => setcardInputModal(false)}
        //onBackdropPress={() => setcardInputModal(false)}
        //onSwipeComplete={() => setcardInputModal(false)}
        
        >
          
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#ffffff40',
          }}
          onPress={() => {
            setcardInputModal(false);
            //setTimeout(() => setcardInputModal(false), Platform.OS === "ios" ? 200 : 0);
            }}>
          <View
            style={{
              padding: 8,
              backgroundColor: BaseColor.white,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
              paddingVertical: 32,
              paddingBottom: 8,
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
              // validColor={BaseColor.whiteColor}
              labelStyle={{ color: BaseColor.black }}
              allowScroll={true}
            />
            <CButton
              title={t('submit')}
              onPress={() => {
                setcardInputModal(false);
                StripePaymentIntentConfirm();
              }}
              style={{
                marginTop: 24,
                margin: 16,
                marginBottom: '75%',
                backgroundColor: BaseColor.btnBlue,
              }}
              titleStyle={{
                color: BaseColor.whiteColor,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      </View> */}


    </>
  );
}
