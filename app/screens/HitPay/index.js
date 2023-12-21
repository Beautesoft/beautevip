import React, { useState } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import CButton from '../../components/CButton';
import { theme } from '../../redux/reducer/theme';
import Toast from 'react-native-simple-toast';
const HitPay = ({ amount, phoneNumber, email, purpose, selectedLocation, orderData, beauty, selectedDate, selectedDateTime }) => {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePaymentRequest = async () => {
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
    try {
      const response = await fetch('https://api.sandbox.hit-pay.com/v1/payment-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-BUSINESS-API-KEY': 'c3e8ac834af59f0cf54d85e588735fb16feed9c0047c8d28a9b19a71f9f3c813',
        },
        body: JSON.stringify({
          "allow_repeated_payments": "true",
          "amount": amount,
          "currency": "SGD",
          "email": email,
          "expires_after": "10 mins",
          "expiry_date": "2023-12-25 13:00:00",
          "name": "test name",
          "payment_methods": [
            "paynow_online"
          ],
          "phone": phoneNumber,
          "purpose": purpose,
          "redirect_url": "http://sequoiasg.ddns.net:7049/Main_API_Train/",
          "reference_number": "true",
          "send_email": "false",
          "send_sms": "false",
          "webhook": "http://sequoiasg.ddns.net:7049/Main_API_Train/"
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
      }

      const responseData = await response.json();

      // Check if 'url' exists in the response data
      if (!responseData.url) {
        throw new Error('Payment URL is undefined');
      }

      // Extract the URL from the response
      const { url } = responseData;

      // Set the URL state
      setPaymentUrl(url);

      // Redirect to the payment URL
      Linking.openURL(url);
    } catch (error) {
      console.error('Error making payment request:', error.message);
    }
  };


  return (

    <View
      style={{
        height: 60,
        backgroundColor: theme().darkGrey,
        paddingHorizontal: 20,
      }}>
      <CButton
        title="Hit Pay (Test Mode)" onPress={handlePaymentRequest} />

    </View>
  );
};
export default HitPay;
