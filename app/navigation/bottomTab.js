import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceScreen from '../screens/ServiceScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HomeScreen from '../screens/HomeScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import BottomTabBar from "./BottomTabBar";
import BaseColor from '../config/colors';

import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../config/icons';
import { FontFamily } from '../config/typography';

export const BottomTabsNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            //tabBar={BottomTabBar}
            activeColor={BaseColor.amber}
            inactiveColor={BaseColor.greyYellow}

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = Icons.home
                    } else if (route.name === 'Booking') {
                        iconName = Icons.calendar
                    } else if (route.name === 'Orders') {
                        iconName = Icons.time_circle
                    } else if (route.name === 'Shopping') {
                        iconName = Icons.bag_new
                    } else if (route.name === 'Me') {
                        iconName = Icons.profile
                    }

                    return <Image
                        resizeMode='contain'
                        tintColor={focused ? BaseColor.amber : BaseColor.greyYellow}
                        style={{ height: 24, width: 24 }}
                        source={iconName} />;
                },
                tabBarActiveTintColor: BaseColor.amber,
                tabBarInactiveTintColor: BaseColor.greyYellow,
                tabBarLabelStyle: {
                    fontSize: (Dimensions.get('window').width * 3.1) / 120,
                    alignItems: 'center',
                    marginTop: 6,
                    fontFamily: FontFamily.Poppins_Medium,

                },
                tabBarStyle: {
                    backgroundColor: BaseColor.darkGrey,
                    height: 70,
                    paddingTop: 10,
                    justifyContent: 'center',
                }
            })}
            initialRouteName="Home">
            <Tab.Screen name="Booking" component={ServiceScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shopping" component={ShoppingScreen} />
            <Tab.Screen name="Me" component={ProfileScreen} />
        </Tab.Navigator>
    );
};