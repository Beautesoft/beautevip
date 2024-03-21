import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { t } from 'i18next';
import { styledFunc } from '../BookingScreenNew/styles';
import Toast from 'react-native-simple-toast';
import CText from '../../components/CText';
import { FontFamily } from '../../config/typography';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import moment from 'moment';
import { theme } from '../../redux/reducer/theme';
import CButton from '../../components/CButton';
import { Modal, Pressable } from 'react-native';//this is for android
import { useNavigation } from '@react-navigation/native';
import BookingDatePicker from '../BookingScreenNew/BookingDatePicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import your icon library
import CHeader from '../../components/CHeader';
const RescheduleComponent = ({ route }) => {
  const { orderData } = route.params;
  const [dateList, setDateList] = useState([]);
  const BookingScreenStyles = styledFunc();
  const [selectedDateTime, setselectedDateTime] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [expandTime, setexpandTime] = useState(false);
  const [expandBeaut, setexpandBeaut] = useState(false);
  const [expandDate, setexpandDate] = useState(false);
  const [availableSlots, setavailableSlots] = useState([]);
  const [availableDates, setavailableDates] = useState([]);
  const [openDateModal, setOpenDateModal] = useState(false);
  const handleCloseDateModal = (date) => {
    setOpenDateModal(false);
    setselectedDate(date);
    setexpandTime(true);
    getAvailableSlots(date);
  };

  useEffect(() => {
    getAvailableDates();
  }, []);

  const navigation = useNavigation();


  const getAvailableDates = async () => {
    //setloader(true);
    const RequestData = {
      siteCode: orderData?.apptSiteCode,
      empCode: orderData?.employeeCode
    };
    //console.log("getAvailableDates - Request", RequestData);
    await getApiData(BaseSetting.endpoints.availableDatesTnc, 'post', RequestData)
      .then((result) => {
        //console.log("getAvailableDates - Response", result);

        setavailableDates(result?.result);
      })
      .catch((err) => {
        return false;
        // setloader(false);
      });
  };

  const getAvailableSlots = (date) => {
    // setloader(true);
    setselectedDateTime("");
    const RequestData = {
      siteCode: orderData?.apptSiteCode,
      slotDate: moment(date, "DD/MM/YYYY").format('YYYY-MM-DD'),
      empCode: orderData?.employeeCode
    };
    //console.log("getAvailableSlots", RequestData);
    getApiData(BaseSetting.endpoints.availableSlotsTnc, 'post', RequestData)
      .then((result) => {
        setavailableSlots(result?.result);
        //console.log("getAvailableSlots", result?.result);
        if (result?.result.length === 0) {
          Toast.show('No Slots available');
        } else {
          setexpandTime(true);
          setTimeout(() => {
            // setloader(false);
          }, 100);
        }

      })
      .catch((err) => {
        setloader(false);
      });
  };

  const RescheduleAppointment = () => {
    // setloader(true);
    if (!selectedDate) {
      Toast.show('Please select date.');
      return;
    }
    if (!selectedDateTime) {
      Toast.show('Please select slot.');
      return;
    }
    console.log(selectedDateTime);
    const formattedTime = moment(selectedDateTime?.time, "hh:mmA").format("HH:mm:ss");

    const RequestData = {
      appointmentCode: orderData?.appointmentID,
      rescheduleDate: moment(selectedDate, "DD/MM/YYYY").format('YYYY-MM-DD'),
      rescheduleTime: formattedTime
    };
    console.log("RescheduleAppointment  -Request", RequestData);
    getApiData(BaseSetting.endpoints.rescheduleAppointment, 'post', RequestData)
      .then((result) => {
        console.log("RescheduleAppointment -Response", result);
        if (result?.success == 0) {
          Toast.show(result?.error);
        }
        else if (result?.success == 1) {
          Toast.show(result?.result);
          navigation.navigate('BottomTabsNavigator', { screen: 'My Booking' });
        }
        else {
          setTimeout(() => {
            // setloader(false);
          }, 100);
        }

      })
      .catch((err) => {
        //setloader(false);
      });
  };



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
  return (
    <>
      <CHeader
        title={('Reschedule Appointment')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <TouchableOpacity
          style={BookingScreenStyles.btnCont}
          activeOpacity={0.7}
          onPress={() => {
            if (true) {
              setexpandTime(false);
              setOpenDateModal(true);
            } else {
              Toast.show('Please select staff');
            }
          }}>
          <Text style={BookingScreenStyles.btnTxt}>
            {selectedDate
              ? selectedDate
              : t('Select Reschedule Date')}
          </Text>


        </TouchableOpacity>

        <TouchableOpacity
          style={[BookingScreenStyles.btnCont]}
          activeOpacity={0.7}
          onPress={() => {
            if (selectedDate) {
              setexpandTime(!expandTime);

            } else {
              Toast.show('Please select date.');
            }
          }}>
          <Text style={BookingScreenStyles.btnTxt}>
            {selectedDateTime?.time
              ? ` ${selectedDateTime?.time
              }`
              : t('Select Reschedule Slot')}
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
        <CButton
          style={BookingScreenStyles.recheduleBtn}
          title={t('Reschedule')}
          onPress={() => RescheduleAppointment()}
        />

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
            <BookingDatePicker onCloseDateModal={handleCloseDateModal} selectedDates={availableDates} componentName="Reschedule" />
          </View>
        </Modal>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    top: 0,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
  },
  closeIcon: {
    position: 'absolute',
    top: 150,
    right: 16,
  },
});

export default RescheduleComponent;
