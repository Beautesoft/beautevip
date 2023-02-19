import React, { useEffect } from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
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
import RangeScreen from '../screens/RangeScreen';
import MyPackages from '../screens/MyPackages';
import MyEarnPoint from '../screens/MyEarnPoints';
import HomeScreen from '../screens/HomeScreen';
import Otp from '../screens/Otp';
import { BottomTabsNavigator } from './bottomTab';
import Invoice from '../screens/Invoice';
import MyOrder from '../screens/MyOrder';
import MyProducts from '../screens/MyProducts';
import ConfirmBooking from '../screens/ConfirmBooking';

export const AppStackNavigator = () => {
  const AppStack = createNativeStackNavigator();
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
      //initialRouteName="BottomTabsNavigator"
    >
      <AppStack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />

      {/* <AppStack.Screen name="Login" component={Login} /> */}
      <AppStack.Screen name="Home" component={HomeScreen} />

      <AppStack.Screen name="OrderDetails" component={OrderDetails} />
      <AppStack.Screen name="RangeScreen" component={RangeScreen} />
      <AppStack.Screen name="SubService" component={SubService} />
      <AppStack.Screen name="BookingScreen" component={BookingScreen} />
      <AppStack.Screen name="ProductDetails" component={ProductDetails} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="ChangeUserName" component={ChangeUserName} />
      <AppStack.Screen name="ChangeAddress" component={ChangeAddress} />
      <AppStack.Screen name="AddAddress" component={AddAddress} />
      <AppStack.Screen name="ChangeEmail" component={ChangeEmail} />
      <AppStack.Screen name="ChangePassword" component={ChangePassword} />
      <AppStack.Screen name="ChangeNumberOtp" component={ChangeNumberOtp} />
      <AppStack.Screen name="Otp" component={Otp} />
      <AppStack.Screen name="NewPhone" component={NewPhone} />
      <AppStack.Screen name="Feedback" component={Feedback} />
      <AppStack.Screen name="Language" component={Language} />
      <AppStack.Screen name="ShoppingBag" component={ShoppingBag} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="Notification" component={Notification} />
      <AppStack.Screen name="OrderConfirm" component={OrderConfirm} />
      <AppStack.Screen name="MyPackages" component={MyPackages} />
      <AppStack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <AppStack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
      />
      <AppStack.Screen name="MyEarnPoint" component={MyEarnPoint} />
      <AppStack.Screen name="Invoice" component={Invoice} />
      <AppStack.Screen name="MyOrder" component={MyOrder} />
      <AppStack.Screen name="MyProducts" component={MyProducts} />
    </AppStack.Navigator>
  );
};
