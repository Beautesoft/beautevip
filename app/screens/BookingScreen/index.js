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
//import { Modal } from 'react-native';//this is for android
import Modal from 'react-native-modals'; //this is for ios

import LinearGradient from 'react-native-linear-gradient';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Images } from '../../config/images';
import { enableAnimateInEaseOut } from '../../config/commonFunctions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { isEmpty, isArray, split } from 'lodash';
import { t } from 'i18next';
import { CreditCardInput } from 'react-native-credit-card-input-view';
import MyModal from '../../components/MyModal';
import { baseUrl } from '../../config/settings';
import { theme } from '../../redux/reducer/theme';
export default function BookingScreen({ navigation, route }) {
  const styles = styledFunc();
  const orderData = route?.params?.itemData;
  console.log(
    '🚀 ~ file: vk index.js ~ line 36 ~ BookingScreen ~ orderData',
    route?.params,
  );

  const type = route?.params?.type;

  const packageType = type === 'package' ? true : false;

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
  const [timeAndStaffLoader, setTimeAndStaffLoader] = useState(false);

  const GetAddress = () => {
    const addressType = 'Shipping';
    // const url = `/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=${addressType}&siteCode=${userData?.siteCode}`;
    const url = `${baseUrl}api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;
    console.log('🚀 ~ file: index.js ~ line 45 ~ GetAddress ~ url', url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setlocation(json?.result);
        console.log('VAddress:>', JSON.stringify(json));
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
    console.log('bookinggggg screen');
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
          GetStaffMemberList(item);
          console.log(
            '🚀 ~ file: index.js ~ line 148 ~ renderTimeSlots ~ item',
            item,
          );
          setTimeAndStaffLoader(true);
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
          console.log('item---->', item);
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

  const BookAppointment = () => {
    if (!selectedLocation) {
      return;
    }
    if (!selectedDate) {
      return;
    }
    if (!selectedDateTime) {
      return;
    }
    if (!beauty) {
      return;
    }
    setloader(true);
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
      siteCode: selectedLocation?.siteCode, //userData?.siteCode,
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
        setloader(false);
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
        setloader(false);
      });
  };

  useEffect(() => {
    //setcardInputModal(false);
    // AvailableSlots();
    //GetAddress();
    // GetStaffMemberList();
    GetSaloonList();
  }, []);

  const getAvailableSlots = (date) => {
    setloader(true);
    const data = {
      siteCode: selectedLocation?.siteCode,
      slotDate: moment(date).format('YYYY-MM-DD'),
    };
    console.log('data time slot', data);
    getApiData(BaseSetting.endpoints.availableSlots, 'post', data)
      .then((result) => {
        setTimeAndStaffLoader(false);
        console.log('result time slot', result);
        setavailableSlots(result?.result);
        setTimeout(() => {
          setloader(false);
          setexpandTime(true);
        }, 100);
      })
      .catch((err) => {
        setloader(false);
        setTimeAndStaffLoader(false);
        console.log('🚀 ~ file: index.js ~ line 213 ~ .then ~ err', err);
      });
  };

  const GetStaffMemberList = (slotTime) => {
    // const data = {
    //   SiteListing: [
    //     {
    //       siteCode: userData?.siteCode,
    //     },
    //   ],
    //   staffName: '',
    //   staffCode: '',
    //   userID: '',
    //   siteCode: userData?.siteCode,
    //   isActive: '1',
    // };
    const data = {
      siteCode: selectedLocation?.siteCode,
      apptDate: moment(selectedDate).format('YYYY-MM-DD'),
      slotTimeIn24Hrs: slotTime.timeIn24Hrs,
      itemCode: orderData.packageList[0].itemCode,
    };
    console.log('line>>349>>', data);

    getApiData(BaseSetting.endpoints.AvailableStaffsTnc, 'post', data)
      .then((result) => {
        setTimeAndStaffLoader(false);
        const filterList = !isEmpty(result?.result)
          ? result?.result.filter((item) => item?.showInAppt === true)
          : [];
        console.log(
          '🚀 ~ file: index.js ~ line 300 ~ .then ~ filterList',
          filterList,
        );
        setstaffArr(result?.result);
      })
      .catch((err) => {
        setTimeAndStaffLoader(false);
        console.log('🚀 ~ file: index.js ~ line 213 ~ .then ~ err', err);
      });
  };

  const GetSaloonList = () => {
    if (packageType) {
      const url = `${baseUrl}api/getSaloonList?siteCode=&userID=&hq=0&serviceItemCode=${orderData.packageList[0].itemCode}`;
      console.log('GetSaloonListURL', url);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log('🚀 line 371>', json);
          setsaloonList(json?.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
        // if (result?.success == 1) {
        //   getCartItems();
        // }
        // navigation.navigate('ShoppingBag');
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabsNavigator' }],
        });
        Toast.show('Added to cart.');
      })
      .catch((err) => {
        //setloader(false);
        console.log('🚀 ~ file: index.js ~ line 35 ~ .then ~ err', err);
      });
  };

  // enableAnimateInEaseOut();
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
              value={packageType ? orderData?.packageName : orderData?.itemName}
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
        {packageType && (
          <View style={{ alignItems: 'center', flex: 1, marginTop: 4 }}>
            <CText value={t('addAppDetail')} color={theme().white} size={14} />
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
                  ? `${moment(selectedDate).format('YYYY-MM-DD')} ${
                      selectedDateTime?.time
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
                if (selectedLocation && selectedDate && selectedDateTime) {
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
          </View>
        )}
      </View>
      <View
        style={{
          height: 100,
          backgroundColor: theme().darkGrey,
          paddingHorizontal: 20,
        }}>
        <CButton
          title={packageType ? 'Book Now' : 'Add to cart'}
          onPress={() => {
            console.log('🚀 ~sCode>', userData?.siteCode);
            if (userData?.customerCode === 'CUSTAPP001') {
              navigation.navigate('Login');
            } else {
              if (packageType) {
                BookAppointment();
              } else {
                AddToCart();
              }
            }
          }}
        />
      </View>

      <DatePicker
        modal
        mode="date"
        open={isDatePickerVisible}
        date={new Date(new Date().getTime())}
        minimumDate={new Date(new Date().getTime())}
        maximumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 365)}
        onConfirm={(val) => {
          console.log('date picker on confirm trigger');
          if (val.getDay() === new Date().getDay()) {
            console.log(
              '🚀 ~VskingMatched>>>',
              val.getDay(),
              new Date().getDay(),
            );
            setselectedDate(
              new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 1),
            );
          } else {
            console.log(
              '🚀 ~VskingNotMatched>>>',
              val.getDay(),
              new Date().getDay(),
            );
            setselectedDate(val);
          }

          getAvailableSlots(val);
          setisDatePickerVisible(false);
          setTimeAndStaffLoader(true);

          // console.log(
          //   '🚀 ~VskingNotMatched>>>',
          //   val.getDay(),
          //   new Date().getDay(),
          // );
          // setTimeAndStaffLoader(true);
          // setselectedDate(val);
          // getAvailableSlots(val);
          // setisDatePickerVisible(false);

          console.log(
            '🚀 ~ file: index.js ~ line 266 ~ BookingScreen ~ val Vk>>',
            val + ',' + new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            moment().add(2, 'days'),
          );
        }}
        onCancel={() => {
          setisDatePickerVisible(false);
        }}
      />
      {/* <CLoader loader={loader} /> */}
      <CLoader loader={timeAndStaffLoader} />
    </>
  );
}
