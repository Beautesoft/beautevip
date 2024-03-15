import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const BookingDatePicker = ({ onCloseDateModal, selectedDates,componentName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  //console.log("BookingDatePicker", selectedDates);
  // Calculate the current date
  const currentDate = moment();

  // Calculate the date 30 days from the current date
  const maxDate = moment().add(30, 'days');


  const handleDateChange = (date) => {
    const formattedDate = date ? moment(date).format('DD/MM/YYYY') : null;
    setSelectedDate(date);
    onCloseDateModal(formattedDate);
  };

  // Get the device screen width
  const screenWidth = Dimensions.get('window').width;

  // Calculate 75% of the screen width
  const adjustedWidth = screenWidth * 0.75;
  return (
    <View style={styles.container}>

      <CalendarPicker
        ref={(ref) => (calendarRef = ref)}
        onDateChange={handleDateChange}
        selectedStartDate={selectedDate}
        selectedEndDate={selectedDate}
        screenWidth={adjustedWidth}
        startFromMonday={true}
        minDate={new Date()}
        maxDate={componentName === "Reschedule" ? maxDate.toDate() : undefined}
        weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookingDatePicker;
