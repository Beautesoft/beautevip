import React, { useEffect } from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import SignUp from '../screens/SignUp';
import AddProfileData from '../screens/AddProfileData';
import SuccessScreen from '../screens/SuccessedScreen';
import Login from '../screens/Login';
import Otp from '../screens/Otp';

export const AuthStackNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        //cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Otp" component={Otp} />
      <AuthStack.Screen name="AddProfileData" component={AddProfileData} />
      <AuthStack.Screen name="SuccessScreen" component={SuccessScreen} />
    </AuthStack.Navigator>
  );
};
