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
  Button,
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
import SelectDropdown from 'react-native-select-dropdown';
import HitPay from '../HitPay';
import BookingDatePicker from './BookingDatePicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import your icon library

import addToCart from './AddToCartService';
export default function BookingScreenNew({ navigation, route }) {
  const styles = styledFunc();
  const type = route?.params?.type;


  const packageType = type === 'package' ? true : false;
  const orderData = route?.params?.itemData;
  //console.log("packagetobooking", orderData);
  const { userData } = useSelector((state) => state.auth);
  const [rateService, setrateService] = useState(false);
  const [expandLocation, setexpandLocation] = useState(false);
  const [expandService, setexpandService] = useState(false);
  const [expandTime, setexpandTime] = useState(false);
  const [expandBeaut, setexpandBeaut] = useState(false);
  const [expandDate, setexpandDate] = useState(false);
  const [selectedDateTime, setselectedDateTime] = useState();
  const [selectedDate, setselectedDate] = useState();

  const [location, setlocation] = useState([]);
  const [beauty, setbeauty] = useState();
  const [selectedLocation, setSelectedLoation] = useState();
  const [selectedService, setSelectedService] = useState();

  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  const [customerStripeID, setcustomerStripeID] = useState('');
  const [availableSlots, setavailableSlots] = useState([]);
  const [availableDates, setavailableDates] = useState([]);
  const displayOldFlow = false;
  const { logout } = AuthAction;
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const isFocused = useIsFocused();
  const [staffArr, setstaffArr] = useState([
  ]);

  const [saloonList, setsaloonList] = useState([]);

  const [cardType, setcardType] = useState('');
  const [intentStripeID, setintentStripeID] = useState('');
  const [intentTransactionID, setintentTransactionID] = useState('');
  const [cardInputModal, setcardInputModal] = useState(false);
  const [isValidateForm, setIsValidateForm] = useState(false);

  const [cardObj, setcardObj] = useState({});

  const [cartItemList, setcartItemList] = useState([]);
  const [cardID, setcardID] = useState('');

  const [loader, setloader] = useState(false);

  const [visible, setVisible] = useState(false);
  const [timeAndStaffLoader, setTimeAndStaffLoader] = useState(false);
  const { clientDetails } = useSelector((state) => state.auth);
  let localAppointmentAdvanceAmount = clientDetails.appointmentAdvanceAmount;
  if (packageType) {
    localAppointmentAdvanceAmount = 0;
  }
  else {
    localAppointmentAdvanceAmount = clientDetails.appointmentAdvanceAmount;
  }
  const [openDateModal, setOpenDateModal] = useState(false);
  const handleCloseDateModal = (date) => {
    setOpenDateModal(false);
    setselectedDate(date);
    setexpandTime(true);
    getAvailableSlots(date);
  };
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


  const handleAddToCart = () => {
    const appointmentRequest = {
      appointmentDate: moment(selectedDate, "DD/MM/YYYY").format('YYYY-MM-DD'),
      appointmentTime: selectedDateTime?.timeIn24Hrs,
      appointmentDuration: packageType ? orderData?.packageList[0]?.duration : orderData?.duration,
      appointmentRemark: "",
      appointmentStaffCode: beauty?.staffCode,
    }
    addToCart(userData, orderData, navigation, appointmentRequest, Toast);
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
          setexpandDate(false);
          setexpandTime(false);
          getAvailableDates(item?.staffCode);
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

  const renderDates = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.dateCont}
        activeOpacity={0.7}
        onPress={() => {
          setselectedDate(item?.date);
          setexpandDate(false);
          setexpandTime(true);
          getAvailableSlots(item?.date);
        }}
      >
        <CText
          value={`${item?.date}`}
          size={22}
          fontFamily={FontFamily.Poppins_Medium}
          style={{
            textAlign: 'center',
          }}
        />
        <View style={{ borderColor: 'grey', borderBottomWidth: 1, }}></View>
      </TouchableOpacity>
    );
  };

  const BookAppointment = (paymentMode) => {
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: packageType ? orderData?.packageList[0]?.itemCode : orderData?.itemCode,
      appointmentDate: moment(selectedDate, "DD/MM/YYYY").format('YYYY-MM-DD'),
      appointmentTime: selectedDateTime?.timeIn24Hrs,
      appointmentDuration: packageType ? orderData?.packageList[0]?.duration : orderData?.duration,
      siteCode: selectedLocation?.siteCode, //userData?.siteCode,
      itemName: packageType ? orderData?.packageList[0]?.itemName : orderData?.itemName,
      treatmentId: '',
      appointmentRemark: paymentMode == "qr" ? "payment pending" : "",
      staffCode: beauty?.staffCode,
      appointmentItemDetails: [
        {
          lineNumber: '1',
          itemCode: packageType ? orderData?.packageList[0]?.itemCode : orderData?.itemCode,
          itemName: packageType ? orderData?.packageList[0]?.itemName : orderData?.itemName,
          unitPrice: packageType ? 0 : orderData?.price,
        },
      ],
      appointmentAdvanceAmount: paymentMode == "Cash" || packageType ? 0 : clientDetails.appointmentAdvanceAmount,
      numberOfAppointments: orderData?.numberOfAppointments > 1 ? orderData?.numberOfAppointments : 1
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
      });
  };


  const getAvailableSlots = (date) => {
    setloader(true);
    const data = {
      siteCode: selectedLocation?.siteCode,
      slotDate: moment(date, "DD/MM/YYYY").format('YYYY-MM-DD'),
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


  const getAvailableDates = async (staffCode) => {
    setloader(true);
    const data = {
      siteCode: selectedLocation?.siteCode,
      empCode: staffCode ? staffCode : beauty?.staffCode
    };
    console.log("getAvailableDates - Request", data);
    await getApiData(BaseSetting.endpoints.availableDatesTnc, 'post', data)
      .then((result) => {
        //console.log("getAvailableDates - Response", result);
        setavailableDates(result?.result);
      })
      .catch((err) => {
        return false;
        setloader(false);
      });
  };

  const GetStaffMemberList = (siteCodeSelected) => {
    const request = {
      siteCode: siteCodeSelected?.siteCode,
      apptDate: "",
      slotTimeIn24Hrs: "",
      itemCode: orderData?orderData.itemCode:""
      //apptDate: moment(selectedDate).format('YYYY-MM-DD'),
      //slotTimeIn24Hrs: slotTime.timeIn24Hrs,
      //itemCode: orderData.packageList[0].itemCode,
    };
    console.log("AvailableStaffsTnc-Request", request);
    getApiData(BaseSetting.endpoints.AvailableStaffsTnc, 'post', request)
      .then((result) => {
        console.log("AvailableStaffsTnc-Response", result);
        setTimeAndStaffLoader(false);
        const filterList = !isEmpty(result?.result)
          ? result?.result.filter((item) => item?.showInAppt === true)
          : [];
        //console.log("getApiData-AvailableStaffsTnc-Response", result?.result)
        setstaffArr(result?.result);
      })
      .catch((err) => {
        setTimeAndStaffLoader(false);
      });
  };

  const GetSaloonList = () => {

    setloader(true);
    const url = `${baseUrl}api/getSaloonList?siteCode=&userID=&hq=0`;
    //console.log("GetSaloonList");
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const filtered = json?.result?.filter((response) => {
          return response.siteCode === userData.siteCode;
        });
        console.log("GetSaloonList-Response : ", json.result[0]);
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
      amount: localAppointmentAdvanceAmount,
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

  function ValidateForm() {
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
    return true;
  }

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
            {orderData?.price !== undefined && (
              <CText
                value={`S$ ${orderData?.price.toFixed(2)}`}
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
            {packageType ?
              <Text style={styles.btnTxt}>
                {orderData ? orderData?.packageName : t('selectService')}
              </Text>
              : <Text style={styles.btnTxt}>
                {orderData ? orderData?.itemDescription : t('selectService')}
              </Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              if (orderData) {
                setexpandTime(false);
                setexpandLocation(false);
                setisDatePickerVisible(false);
                setexpandBeaut(!expandBeaut);
              } else {
                Toast.show('Please select service');
              }
            }}>
            <Text style={styles.btnTxt}>
              {beauty
                ? `${beauty?.displayName} `
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
            style={styles.btnCont}
            activeOpacity={0.7}
            onPress={() => {
              if (beauty) {
                setexpandTime(false);
                setexpandLocation(false);
                setisDatePickerVisible(false);
                setexpandBeaut(false);
                setOpenDateModal(!expandDate)
              } else {
                Toast.show('Please select staff');
              }
            }}>
            <Text style={styles.btnTxt}>
              {selectedDate
                ? selectedDate
                : t('Select Available Date')}
            </Text>

            {expandDate && (
              <View
                style={{
                  height: 130,
                  width: '100%',
                  paddingTop: 12,
                  marginBottom: '10%',
                }}>
                <FlatList
                  data={availableDates}
                  keyExtractor={(item, index) => index}
                  renderItem={renderDates}
                  contentContainerStyle={{
                    width: '100%',
                  }}
                  numColumns={1}
                  showsVerticalScrollIndicator={true}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnCont]}
            activeOpacity={0.7}
            onPress={() => {
              if (selectedDate) {
                setexpandBeaut(false);
                setexpandLocation(false);
                setexpandTime(!expandTime);

              } else {
                Toast.show('Please select date.');
              }
            }}>
            <Text style={styles.btnTxt}>
              {selectedDateTime?.time
                ? ` ${selectedDateTime?.time
                }`
                : t('Select Available Slot')}
            </Text>
            {expandTime && (
              <View style={{ height: 130, width: '100%', paddingTop: 12 }}>
                <FlatList
                  data={availableSlots}
                  keyExtractor={(item, index) => index}
                  renderItem={renderTimeSlots}
                  contentContainerStyle={{
                    width: '100%',
                  }}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </TouchableOpacity>

        </View>

      </View>
      {packageType && <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>Selected item is a package </Text>}
      {orderData?.numberOfAppointments > 1 && <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>Selected item is a package </Text>}
      {displayOldFlow &&
        <View
          style={{
            height: 60,
            backgroundColor: theme().darkGrey,
            paddingHorizontal: 20,
          }}>

          <CButton
            title={'Book Now'}
            onPress={() => {
              if (userData?.customerCode === 'CUSTAPP001') {
                navigation.navigate('Login');
              } else {
                if (ValidateForm()) {
                  if (localAppointmentAdvanceAmount > 0) {
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
      }


      <View>
        {localAppointmentAdvanceAmount > 0 &&
          <View
            style={{
              height: 120,
              backgroundColor: theme().darkGrey,
              paddingHorizontal: 20,
            }}>
            <CButton
              style={{ marginBottom: 10 }}
              title={'Add to Cart'}
              onPress={() => {
                if (userData?.customerCode === 'CUSTAPP001') {
                  dispatch(logout());

                  // Add a timeout before navigating to 'Login'
                  setTimeout(() => {
                    navigation.navigate('Login');
                  }, 300); 
                } else {
                  if (ValidateForm()) {
                    handleAddToCart()
                  }
                }
              }
              }
            />


          </View>
        }

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
              <Text style={{ paddingHorizontal: 20, top: Platform.OS === 'ios' ? '55%' : '70%', color: 'red', fontSize: 20 }}> Booking Advance :  {orderData?.numberOfAppointments * localAppointmentAdvanceAmount} $</Text>
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



      </View>
      <Modal
        style={{ flex: 1 }}
        transparent
        visible={openDateModal}
        animationType="slide"
        onRequestClose={() => {

        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setOpenDateModal(false)}
          >
            <FontAwesomeIcon name="close" size={30} color="black" />
          </TouchableOpacity>
          <BookingDatePicker onCloseDateModal={handleCloseDateModal} selectedDates={availableDates} />
        </View>
      </Modal>
    </>
  );
}
