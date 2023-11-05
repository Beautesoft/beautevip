import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modal } from 'react-native';//this is for android
//import Modal from 'react-native-modals'; //this is for ios

import LinearGradient from 'react-native-linear-gradient';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Images } from '../../config/images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { isEmpty, isArray, split, filter } from 'lodash';
import { t } from 'i18next';
import { CreditCardInput } from 'react-native-credit-card-input-view';
import MyModal from '../../components/MyModal';
import { baseUrl } from '../../config/settings';
import { theme } from '../../redux/reducer/theme';
import AuthAction from '../../redux/reducer/auth/actions';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
export default function BookingScreenNew({ navigation, route }) {
  const styles = styledFunc();
  const type = 'package';

  const packageType = type === 'package' ? true : false;
  const orderData = route?.params?.itemData;
  const { userData } = useSelector((state) => state.auth);
  const [rateService, setrateService] = useState(false);
  const [expandLocation, setexpandLocation] = useState(false);
  const [expandService, setexpandService] = useState(false);
  const [expandTime, setexpandTime] = useState(false);
  const [expandBeaut, setexpandBeaut] = useState(false);
  const [selectedDateTime, setselectedDateTime] = useState();
  const [selectedDate, setselectedDate] = useState();

  const [location, setlocation] = useState([]);
  const [beauty, setbeauty] = useState();
  const [selectedLocation, setSelectedLoation] = useState();
  const [selectedService, setSelectedService] = useState();

  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  const [customerStripeID, setcustomerStripeID] = useState('');
  const [availableSlots, setavailableSlots] = useState([]);
  const isFocused = useIsFocused();
  const [staffArr, setstaffArr] = useState([
  ]);
  const [saloonList, setsaloonList] = useState([]);

  const [cardType, setcardType] = useState('');
  const [intentStripeID, setintentStripeID] = useState('');
  const [intentTransactionID, setintentTransactionID] = useState('');
  const [cardInputModal, setcardInputModal] = useState(false);
  const [payNowInputModal, setpayNowInputModal] = useState(false);

  const [cardObj, setcardObj] = useState({});

  const [cartItemList, setcartItemList] = useState([]);
  const [cardID, setcardID] = useState('');

  const [loader, setloader] = useState(false);

  const [visible, setVisible] = useState(false);
  const [timeAndStaffLoader, setTimeAndStaffLoader] = useState(false);
  const { clientDetails } = useSelector((state) => state.auth);
  const GetAddress = () => {
    const addressType = 'Shipping';
    // const url = `/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=${addressType}&siteCode=${userData?.siteCode}`;
    const url = `${baseUrl}api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setlocation(json?.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const { addBookingData } = AuthAction;
  const dispatch = useDispatch();
  const { bookingData } = useSelector((state) => state.auth);
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
  useEffect(() => {
    GetSaloonList();

  }, [isFocused]);
  useEffect(() => {
    //setcardInputModal(false);
    // AvailableSlots();
    //GetAddress();
  }, []);

  const renderTimeSlots = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ padding: 8, alignItems: 'center' }}
        onPress={() => {
          setexpandTime(false);
          setselectedDateTime(item);
          //GetStaffMemberList();
          //setTimeAndStaffLoader(true);
        }}>
        <Text style={{ color: theme().white90 }}>{item?.time}</Text>
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
            color={theme().amberTxt}
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

  const BookAppointment = (paymentMode) => {
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: orderData?.itemCode,
      appointmentDate: moment(selectedDate).format('YYYY-MM-DD'),
      appointmentTime: selectedDateTime?.timeIn24Hrs,
      appointmentDuration: orderData?.duration,
      siteCode: selectedLocation?.siteCode, //userData?.siteCode,
      itemName: orderData?.itemName,
      treatmentId: '',
      appointmentRemark: paymentMode == "qr" ? "payment pending" : "",
      staffCode: beauty?.staffCode,
      appointmentItemDetails: [
        {
          lineNumber: '1',
          itemCode: orderData?.itemCode,
          itemName: orderData?.itemName,
          unitPrice: orderData?.price,
        },
      ],
      appointmentAdvanceAmount: paymentMode == "Cash" ? 0 : clientDetails?.appointmentAdvanceAmount
    };
    console.log('BookAppointment - Request Section', data);
    getApiData(BaseSetting.endpoints.bookAppointment, 'post', data)
      .then((result) => {
        console.log('BookAppointment - Response Section', result);
        setloader(false);
        if (result?.success == 1) {
          Toast.show('Appointment Booked');
          navigation.navigate('BottomTabsNavigator');
        } else {
          console.log('BookAppointment - Response Section -Error', result?.error);
          Toast.show(result?.error);
        }
      })
      .catch((err) => {
        Toast.show('Something went wrong!');
        setloader(false);
        setpayNowInputModal(false);
      });
  };


  const getAvailableSlots = (date) => {
    setloader(true);
    const data = {
      siteCode: selectedLocation?.siteCode,
      slotDate: moment(date).format('YYYY-MM-DD'),
      empCode: beauty?.staffCode
    };
    console.log("getAvailableSlots", data);
    getApiData(BaseSetting.endpoints.availableSlotsTnc, 'post', data)
      .then((result) => {
        setTimeAndStaffLoader(false);
        setavailableSlots(result?.result);
        console.log("getAvailableSlots", result?.result);
        if (result?.result.length === 0) {

          // The result is empty (no elements)
          // Your code here for the empty result
          Toast.show('No Slots available');
        } else {
          // The result is not empty (contains elements)
          // Your code here for a non-empty result
          setexpandTime(true);
          setTimeout(() => {
            setloader(false);
          }, 100);
        }

      })
      .catch((err) => {
        setloader(false);
        setTimeAndStaffLoader(false);
      });
  };


  const getAvailableDatesAndValidation = async (targetDate) => {
    setloader(true);
    const data = {
      siteCode: selectedLocation?.siteCode,
      empCode: beauty?.staffCode
    };

    await getApiData(BaseSetting.endpoints.availableDatesTnc, 'post', data)
      .then((result) => {
        const formattedTargetDate = formatCustomDate(targetDate);
        const foundItem = result?.result.find(item => item.date === formattedTargetDate)
        const itemFound = !!foundItem; // Convert foundItem to a boolean value
        console.log("getAvailableDatesAndValidation", result);
        console.log("formattedTargetDate", formattedTargetDate);
        console.log("foundItem", foundItem);
        console.log("itemFound", itemFound);
        return itemFound;
      })
      .catch((err) => {
        return false;
        setloader(false);
      });
  };

  const formatCustomDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year} 12:00:00 AM`;
  };
  const GetStaffMemberList = (siteCodeSelected) => {
    const data = {
      siteCode: siteCodeSelected?.siteCode,
      apptDate: "",
      slotTimeIn24Hrs: "",
      itemCode: ""
      //apptDate: moment(selectedDate).format('YYYY-MM-DD'),
      //slotTimeIn24Hrs: slotTime.timeIn24Hrs,
      //itemCode: orderData.packageList[0].itemCode,
    };

    getApiData(BaseSetting.endpoints.AvailableStaffsTnc, 'post', data)
      .then((result) => {
        setTimeAndStaffLoader(false);
        const filterList = !isEmpty(result?.result)
          ? result?.result.filter((item) => item?.showInAppt === true)
          : [];
        console.log("getApiData-AvailableStaffsTnc-Response", result?.result)
        setstaffArr(result?.result);
      })
      .catch((err) => {
        setTimeAndStaffLoader(false);
      });
  };

  const GetSaloonList = () => {

    setloader(true);
    if (packageType) {
      const url = `${baseUrl}api/getSaloonList?siteCode=&userID=&hq=0`;
      console.log("GetSaloonList");
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const filtered = json?.result?.filter((response) => {
            return response.siteCode === userData.siteCode;
          });
          setsaloonList(json?.result);
          setSelectedLoation(json?.result[0]);
          GetStaffMemberList(json?.result[0]);
          setTimeout(() => {
            setloader(false);
          }, 500);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(() => {
            setloader(false);
          }, 500);
        });
    }
  };



  const StripeCustomerCreate = () => {
    setloader(true);

    const data = {
      customerName: userData?.customerName,
      customerEmail: userData?.email,
      customerPhone: userData?.customerPhone,
    };
    console.log('StripeCustomerCreate');
    console.log(data);

    getApiData(BaseSetting.endpoints.stripeCustomerCreate, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 86 ~ .then ~ result', result);
        if (result?.success == 1) {
          // setcustomerStripeID(result?.result?.id);
          StripePaymentIntentCreate(result?.result?.id);
        } else {
          Toast.show(result?.error);
          setcardInputModal(false);
          setloader(false);
        }

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
      amount: clientDetails?.appointmentAdvanceAmount,
      currency: 'sgd',
      isAppointment: true,
    };
    console.log('StripePaymentIntentCreate - Request Section', data);

    getApiData(BaseSetting.endpoints.stripePaymentIntentCreate, 'post', data)
      .then((result) => {
        console.log('StripePaymentIntentCreate - Response Section', result);
        setloader(false);
        if (result?.success == 1) {
          setintentStripeID(result?.result?.id);
          setintentTransactionID(result?.result?.transactionId);
          setTimeout(() => {
            setcardInputModal(true);
          }, 100);
        }
      })
      .catch((err) => {
        console.log('StripePaymentIntentCreate - Error Section', err);
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
      transactionId: intentTransactionID,
      paymentType: 'Credit Card',
    };
    console.log('StripePaymentIntentConfirm - Request Section', data);

    getApiData(BaseSetting.endpoints.stripePaymentIntentConfirm, 'post', data)
      .then((result) => {
        console.log('StripePaymentIntentConfirm - Response Section', result);
        if (result?.success == 1) {
          BookAppointment("Credit");
          setcardInputModal(false);
        } else {
          Toast.show(result?.error);
          setloader(false);
        }
      })
      .catch((err) => {
        console.log('StripePaymentIntentConfirm - Error Section', err);
        setloader(false);
      });
  };


  return (
    <>
      <CHeader
        title={t('booking')}
        showLeftIcon
        showCartIcon
        onLeftIconPress={() => navigation.goBack()}
        onCartIconPress={() => navigation?.navigate('ShoppingBag', {})}
      />

      <View style={styles.container}>
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
                tintColor={theme().black}
              />
            </LinearGradient>
          </View>
          <View style={{ paddingStart: 8, flex: 1 }}>
            <CText
              value="New Appointment"
              color={theme().amberTxt}
              size={20}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            {!!orderData?.duration && (
              <CText
                value={`${!!orderData?.duration ? orderData?.duration : 0} min`}
                color={theme().amberTxt}
                size={18}
                fontFamily={FontFamily.Poppins_Regular}
              />
            )}
            {orderData?.price && (
              <CText
                value={`S$ ${orderData?.price}`}
                color={theme().amberTxt}
                size={18}
                fontFamily={FontFamily.Poppins_Regular}
              />
            )}
          </View>
        </View>

        <View style={{ alignItems: 'center', flex: 1, marginTop: 4 }}>
          <CText value={t('addAppDetail')} color={theme().white} size={14} />
          {/*Select Location  */}
          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              setexpandService(false);
              setexpandBeaut(false);
              setexpandTime(false);
              setisDatePickerVisible(false);
              setexpandLocation(!expandLocation);
              //GetAddress();
            }}>
            <Text style={styles.btnTxt}>
              {selectedLocation
                ? selectedLocation?.siteName
                : t('selectLocation')}
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

          {/*Select Service  */}
          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}

            onPress={() => {
              if (selectedLocation) {
                const userDataFromRedux = {
                  ...userData,
                  siteCode: selectedLocation?.siteCode,
                };
                userDataFromRedux.siteCode = selectedLocation?.siteCode;
                dispatch({
                  type: 'LOGIN_SUCCESS',
                  data: userDataFromRedux,
                });
                navigation.navigate('ServiceScreen');
                // bookingData.itemCode = '101';
                dispatch(addBookingData('newflow'));
              } else {
                Toast.show('Please select location first.');
              }
            }}>
            <Text style={styles.btnTxt}>
              {orderData ? orderData?.itemDescription : t('selectService')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              if (selectedLocation) {
                setexpandTime(false);
                setexpandLocation(false);
                setisDatePickerVisible(false);
                setexpandBeaut(!expandBeaut);
              } else {
                Toast.show('Please select location,date and time first.');
              }
            }}>
            <Text style={styles.btnTxt}>
              {beauty
                ? `${beauty?.firstName} ${beauty?.lastName}`
                : t('selectAvail')}
            </Text>

            {expandBeaut && (
              <View
                style={{
                  height: 160,
                  width: '100%',
                  paddingTop: 12,
                  marginBottom: '10%',
                }}>
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
          <TouchableOpacity
            style={[styles.btnCont]}
            activeOpacity={0.7}
            onPress={() => {
              if (selectedLocation) {
                setexpandBeaut(false);
                setexpandLocation(false);
                setisDatePickerVisible(!isDatePickerVisible);
              } else {
                Toast.show('Please select location first.');
              }

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

        </View>
      </View>
      <View
        style={{
          height: 60,
          backgroundColor: theme().darkGrey,
          paddingHorizontal: 20,
        }}>
        <CButton
          title={packageType ? 'Book Now' : 'Add to cart'}
          onPress={() => {
            if (userData?.customerCode === 'CUSTAPP001') {
              navigation.navigate('Login');
            } else {
              if (packageType) {
                if (!selectedLocation) {
                  Toast.show('Please Select Site');
                  return;
                }
                if (!orderData) {
                  Toast.show('Please Select Service');
                  return;
                }
                if (!beauty) {
                  Toast.show('Please Select  Staff');
                  return;
                }
                if (!selectedDate) {
                  Toast.show('Please Select Date');
                  return;
                }


                if (clientDetails?.appointmentAdvanceAmount > 0) {
                  setcardInputModal(true);
                  StripeCustomerCreate();
                }
                else {
                  BookAppointment("Cash");
                }
              }
            }
          }}
        />
      </View>
      {clientDetails?.appointmentAdvanceAmount > 0 &&
        <View
          style={{
            height: 60,
            backgroundColor: theme().darkGrey,
            paddingHorizontal: 20,
          }}>
          <CButton
            title='Pay Now'
            onPress={() => {
              if (userData?.customerCode === 'CUSTAPP001') {
                navigation.navigate('Login');
              } else {
                if (packageType) {
                  if (!selectedLocation) {
                    Toast.show('Please Select Site');
                    return;
                  }
                  if (!orderData) {
                    Toast.show('Please Select Service');
                    return;
                  }
                  if (!beauty) {
                    Toast.show('Please Select  Staff');
                    return;
                  }
                  if (!selectedDate) {
                    Toast.show('Please Select Date');
                    return;
                  }
                  if (!selectedDateTime) {
                    Toast.show('Please Select  Time');
                    return;
                  }

                  if (clientDetails?.appointmentAdvanceAmount > 0) {
                    setpayNowInputModal(true);
                  }
                }
              }
            }}
          />
        </View>
      }

      <DatePicker
        modal
        mode="date"
        open={isDatePickerVisible}
        date={new Date(new Date().getTime())}
        minimumDate={new Date(new Date().getTime())}
        maximumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 365)}
        onConfirm={async (val) => {
          if (val.getDay() === new Date().getDay()) {
            setselectedDate(
              new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 1),
            );
          } else {
            setselectedDate(val);
          }

          getAvailableSlots(val);
          setisDatePickerVisible(false);
          setTimeAndStaffLoader(true);

          // setTimeAndStaffLoader(true);
          // setselectedDate(val);
          // getAvailableSlots(val);
          // setisDatePickerVisible(false);
        }}
        onCancel={() => {
          setisDatePickerVisible(false);
        }}

      />
      {/* <CLoader loader={loader} /> */}
      <CLoader loader={timeAndStaffLoader} />
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
                  setcardType(val?.values?.type);

                  setcardObj(tempObj);
                }}
                cardFontFamily={FontFamily.arial_bold}
                // validColor={theme().whiteColor}
                labelStyle={{ color: theme().black }}
                allowScroll={true}
              />
            </View>
            <Text style={{ paddingHorizontal: 20, top: Platform.OS === 'ios' ? '55%' : '70%', color: 'red', fontSize: 20 }}> Booking Advance :  {clientDetails.appointmentAdvanceAmount} $</Text>
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
      <Modal
        style={{ flex: 1 }}
        transparent
        visible={payNowInputModal}
        animationType="slide"
        onRequestClose={() => {
          if (!loader) {
            setpayNowInputModal(false);
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
              setpayNowInputModal(false);
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
                top: 60,
                padding: 10,

              }}>
              <Image
                style={{ height: 200, width: 200, borderRadius: 10 }}
                source={Images.qrcode} />

            </View>
            <Text style={{ paddingHorizontal: 20, top: Platform.OS === 'ios' ? '55%' : '70%', color: 'red', fontSize: 20 }}> Booking Advance :  {clientDetails.appointmentAdvanceAmount} $</Text>
            <CButton
              loader={loader}
              title='Complete Payment'
              onPress={() => {
                BookAppointment("qr");
              }}
              style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? '55%' : '80%',
                width: '90%',
                marginBottom: 0,
                alignSelf: 'center',
                backgroundColor: theme().btnBlue,
                color:'white'
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
