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

const RescheduleComponent = ({ orderData, closeModal }) => {
  const [dateList, setDateList] = useState([]);
  const BookingScreenStyles = styledFunc();
  const [selectedDateTime, setselectedDateTime] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [expandTime, setexpandTime] = useState(false);
  const [expandBeaut, setexpandBeaut] = useState(false);
  const [expandDate, setexpandDate] = useState(false);
  const [availableSlots, setavailableSlots] = useState([]);
  const [availableDates, setavailableDates] = useState([]);
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
    console.log("getAvailableDates - Request", RequestData);
    await getApiData(BaseSetting.endpoints.availableDatesTnc, 'post', RequestData)
      .then((result) => {
        console.log("getAvailableDates - Response", result);

        setavailableDates(result?.result);
      })
      .catch((err) => {
        return false;
        // setloader(false);
      });
  };

  const getAvailableSlots = (date) => {
    // setloader(true);
    const RequestData = {
      siteCode: orderData?.apptSiteCode,
      slotDate: moment(date, "DD/MM/YYYY").format('YYYY-MM-DD'),
      empCode: orderData?.employeeCode
    };
    console.log("getAvailableSlots", RequestData);
    getApiData(BaseSetting.endpoints.availableSlotsTnc, 'post', RequestData)
      .then((result) => {
        setavailableSlots(result?.result);
        console.log("getAvailableSlots", result?.result);
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
          closeModal();
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
    <View style={styles.container}>
      <TouchableOpacity
        style={BookingScreenStyles.btnCont}
        activeOpacity={0.7}
        onPress={() => {
          if (true) {
            setexpandTime(false);
            setexpandDate(!expandDate)
          } else {
            Toast.show('Please select staff');
          }
        }}>
        <Text style={BookingScreenStyles.btnTxt}>
          {selectedDate
            ? selectedDate
            : t('Select Reschedule Date')}
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

      <CButton
        style={BookingScreenStyles.recheduleBtn}
        title={t('Close')}
        onPress={() => closeModal()}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    top: -120,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  }
});

export default RescheduleComponent;
