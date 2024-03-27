import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Platform ,TouchableOpacity } from 'react-native';
import CHeader from '../../components/CHeader';
import { t } from 'i18next';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import Toast from 'react-native-simple-toast';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';


const HitPay = ({ navigation, route }) => {
  const { clientDetails } = useSelector((state) => state.auth);
  const [paymentInProgress, setPaymentInProgress] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [hitPayRequestId, setHitPayRequestId] = useState('');
  const { hitpayrequest, customerCode, hitPayBookAppointmentRequest } = route.params;
  const { amount, email, phoneNumber, purpose } = hitpayrequest;
  console.log(hitPayBookAppointmentRequest);

  // Function to open a custom URL scheme
const openCustomUrlScheme = async (scheme,url) => {

  try {
    if (Platform.OS === 'ios') {
      // Check if the app is installed before opening the URL
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.warn(`App with scheme ${scheme} is not installed.`);
      }
    } else {
      // For Android, open the URL directly
      await Linking.openURL(url);
    }
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};
  useEffect(() => {
    try {
      handlePaymentRequest();
    } catch (error) {
      // console.error('Error in useEffect:', error);
    }
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        getHitPayPaymentStatus();
        console.log('service called');
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    }, 10000); // 10 seconds interval

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on component mount


  const getHitPayPaymentStatus = () => {
    const request = {
      custCode: customerCode
    };
    console.log("getHitPayPaymentStatus-Request", request);
    getApiData(BaseSetting.endpoints.appHitpayCallback, 'get', request)
      .then((result) => {
        console.log("getHitPayPaymentStatus-response", result);
        if (result?.status === "Success") {
          Toast.show(result?.status);
          setPaymentInProgress(!paymentInProgress);
          navigation.navigate('BottomTabsNavigator');
          //BookAppointment();
        } else {
          Toast.show(result?.status);
        }

      })
      .catch((err) => {
        console.error(err);
      });
  };
  function getSingaporeDateTime() {
    const singaporeTime = moment().tz('Asia/Singapore');
    singaporeTime.add(5, 'minutes'); // Add 5 minutes

    return singaporeTime.format('YYYY-MM-DD HH:mm:ss');
  }
  const handlePaymentRequest = async () => {
    console.log("handlePaymentRequest");
    try {
      const response = await fetch(clientDetails.hitpayURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-BUSINESS-API-KEY': clientDetails.hitpayApiKey,
        },
        body: JSON.stringify({
          "allow_repeated_payments": "true",
          "amount": amount,
          "currency": "SGD",
          "email": email,
          "expires_after": "5 mins",
          "expiry_date": getSingaporeDateTime(),
          "name": "test name",
          "payment_methods": [
            "paynow_online",
            "card"
          ],
          "phone": phoneNumber,
          "purpose": purpose,
          "redirect_url":BaseSetting.api+BaseSetting.endpoints.appHitpayCallback,
          "reference_number": "true",
          "send_email": "false",
          "send_sms": "false",
          "webhook": BaseSetting.baseUrl
        }),
      });
      console.log(BaseSetting.api+BaseSetting.endpoints.appHitpayCallback);
      console.log(BaseSetting.baseUrl);
      if (!response.ok) {
        const responseText = await response.text();
        Toast.show(responseText);
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
      }

      const responseData = await response.json();
      if (!responseData.url) {
        throw new Error('Payment URL is undefined');
      }
      const { url, id, redirect_url } = responseData;
      console.log("Payment Request Id: ", id);
      console.log("Payment Request URL: ", url);
      console.log("Payment Request redirect_url: ", redirect_url);
      setHitPayRequestId(id);
      setPaymentUrl(url);
      const customSchemeToOpen = 'kirei';
      openCustomUrlScheme(customSchemeToOpen,url);
      //Linking.openURL("https://www.google.com/").catch((err) => console.error('Error opening URL:', err));
      //Linking.openURL(encodedUrl);
      appUpdatePaymentDetails(id);
    } catch (error) {
      console.error('Error making payment request:', error.message);
    }
  };

  const appUpdatePaymentDetails = (paymentId) => {
    console.log('inside appUpdatePaymentDetails--->');
    const data = {
      customerCode: customerCode,
      paymentGateWay: 'HitPay',
      paymentMethod: 'paynow_online',
      qty: 1,
      paymentId: paymentId,
      amount: amount,
      isAppointmentAdvance: 1,
    };
    console.log('appUpdatePaymentDetails - Request Section', data);

    getApiData(BaseSetting.endpoints.appUpdatePaymentDetails, 'post', data)
      .then((result) => {
        console.log('appUpdatePaymentDetails - Response Section', result);
        if (result?.success == 1) {
        }
      })
      .catch((err) => {
        console.log('StripePaymentIntentCreate - Error Section', err);
      });
  };

  const BookAppointment = () => {
    console.log('BookAppointment - Request Section', hitPayBookAppointmentRequest);
    getApiData(BaseSetting.endpoints.bookAppointment, 'post', hitPayBookAppointmentRequest)
      .then((result) => {
        console.log('BookAppointment - Response Section', result);
        if (result?.success == 1) {
          Toast.show('Appointment Booked');
          navigation.navigate('BottomTabsNavigator');
        } else {
          console.log('BookAppointment - Response Section -Error', result?.error);
          Toast.show("Payment Success - Please Check with admin");
          Toast.show(result?.error);
        }
      })
      .catch((err) => {
        Toast.show('Something went wrong!');
        setpayNowInputModal(false);
      });
  }
  return (
    <>
      <CHeader
        title={t('HitPay Payment')}
        showLeftIcon
        showCartIcon
        onLeftIconPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Text style={styles.title}>HitPay</Text>
        {paymentInProgress ? (
          <View style={styles.centeredContent}>
            <Text>Payment in progress...Please proceed your payment in the browser page QR Code or Card</Text>
          </View>
        ) : (
          <View style={styles.centeredContent}>
            <Text>Payment successful!</Text>
          </View>
        )}
        <TouchableOpacity style={styles.getPaymentStatusButton} onPress={getHitPayPaymentStatus}>
          <Text style={styles.buttonText}>Get Payment Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getPaymentStatusButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centeredContent: {
    alignItems: 'center',
  },
  getPaymentStatusButton: {
    backgroundColor: '#F5F5DC',
    fontSize: 32,
    padding: 20,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HitPay;
