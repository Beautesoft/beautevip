import React, { useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import SignUp from '../screens/SignUp';
import Otp from '../screens/Otp';
import AddProfileData from '../screens/AddProfileData';
import SuccessScreen from '../screens/SuccessedScreen';
import ServiceScreen from '../screens/ServiceScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HomeScreen from '../screens/HomeScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabBar from './BottomTabBar';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderDetails from '../screens/OrderDetails';
import SubService from '../screens/SubService';
import BookingScreen from '../screens/BookingScreen';
import ProductDetails from '../screens/ProductDetails';
import Settings from '../screens/Settings';
import ChangeUserName from '../screens/ChangeUserName';
import ChangeAddress from '../screens/ChangeAddress';
import AddAddress from '../screens/AddAddress';
import ChangeEmail from '../screens/ChangeEmail';
import ChangePassword from '../screens/ChangePassword';
import ChangeNumberOtp from '../screens/ChangeNumberOtp';
import NewPhone from '../screens/NewPhone';
import Feedback from '../screens/FeedBack';
import Language from '../screens/Language';
import ShoppingBag from '../screens/ShoppingBag';
import Checkout from '../screens/Checkout';
import Notification from '../screens/Notification';
import NotificationDetail from '../screens/NotificationDetail';
import OrderConfirm from '../screens/OrderConfirm';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import RangeScreen from '../screens/RangeScreen';
import MyPackages from '../screens/MyPackages';
import i18n from '../language/i18n';
import BaseColor from '../config/colors';

// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const UpcomingScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <>
        <Text style={{ fontSize: 20, color: 'black' }}>{props.text}</Text>
        <Text style={{ fontSize: 13 }}>Coming Soon</Text>
      </>
    </View>
  );
};

export default function NavStart() {
  const { userData } = useSelector((state) => state.auth);

  const { currentLanguage } = useSelector((state) => state.auth);

  console.log('🚀 ~ file: index.js ~ line 57 ~ NavStart ~ userData', userData);

  const Stack = createStackNavigator();

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (value) => {
    console.log(
      '🚀 ~ file: index.js ~ line 80 ~ changeLanguage ~ value',
      value,
    );

    try {
      i18n
      .changeLanguage(value)
      .then(() => {
        // setLanguage(value);
      })
      .catch((err) => console.log(err));

    } catch (error) {
      
    }
    

  };

  const BottomTabsNavigator = () => {
    return (
      <Tab.Navigator
        tabBar={BottomTabBar}
        activeColor={BaseColor.amber}
        inactiveColor={BaseColor.greyYellow}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Tab.Screen name="Booking" component={ServiceScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shopping" component={ShoppingScreen} />
        <Tab.Screen name="Me" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isEmpty(userData) ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword"  component={ResetPassword} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="AddProfileData" component={AddProfileData} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
          initialRouteName="BottomTabsNavigator">
          {/* <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="AddProfileData" component={AddProfileData} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} /> */}
          <Stack.Screen
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
          />
          
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="RangeScreen" component={RangeScreen} />
          <Stack.Screen name="SubService" component={SubService} />
          <Stack.Screen name="BookingScreen" component={BookingScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ChangeUserName" component={ChangeUserName} />
          <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeNumberOtp" component={ChangeNumberOtp} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="NewPhone" component={NewPhone} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="ShoppingBag" component={ShoppingBag} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
          <Stack.Screen name="MyPackages" component={MyPackages} />
          <Stack.Screen
            name="NotificationDetail"
            component={NotificationDetail}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
