import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceScreen from '../screens/ServiceScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HomeScreen from '../screens/HomeScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/Settings';
// import BottomTabBar from "./BottomTabBar";
import { theme } from '../redux/reducer/theme';

import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../config/icons';
import { FontFamily } from '../config/typography';
import ShoppingBag from '../screens/ShoppingBag';
import { useSelector } from 'react-redux';
export const BottomTabsNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { clientDetails } = useSelector((state) => state.auth);
  return (
    <Tab.Navigator
      //tabBar={BottomTabBar}
      activeColor={theme().amber}
      inactiveColor={theme().greyYellow}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = Icons.home;
          } else if (route.name === 'Services') {
            iconName = Icons.calendar;
          } else if (route.name === 'My Booking') {
            iconName = Icons.time_circle;
          } else if (route.name === 'Cart') {
            iconName = Icons.bag_new;
          } else if (route.name === 'My Profile') {
            iconName = Icons.profile;
          }

          return (
            <Image
              resizeMode="contain"
              tintColor={focused ? theme().amber : theme().color_806306}
              style={{ height: 32, width: 32 }}
              source={iconName}
            />
          );
        },
        tabBarActiveTintColor: theme().amber,
        tabBarInactiveTintColor: theme().white,
        tabBarLabelStyle: {
          fontSize: (Dimensions.get('window').width * 3.1) / 120,
          alignItems: 'center',
          marginTop: 6,
          fontFamily: FontFamily.Poppins_SemiBold,
        },
        tabBarStyle: {
          backgroundColor: theme().darkGrey,
          height: 70,
          paddingTop: 10,
          justifyContent: 'center',
        },
      })}
      initialRouteName="Home">
      <Tab.Screen name="My Booking" component={OrdersScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Cart" component={ShoppingBag} />

      <Tab.Screen name="My Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
