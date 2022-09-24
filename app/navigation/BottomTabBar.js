import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import BaseColor from '../config/colors';
import { Icons } from '../config/icons';
import { FontFamily } from '../config/typography';

const ButtonIcons = {
  Booking: Icons.calendar,
  Orders: Icons.time_circle,
  Home: Icons.home,
  Shopping: Icons.bag_new,//Icons.bag,
  Me: Icons.profile,
};

const ButtonNames = {
  Booking: 'Booking',
  Orders: 'Orders',
  Home: 'Home',
  Shopping: 'Shopping',
  Me: 'Me',
};

export default function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        backgroundColor: BaseColor.darkGrey,
        height: 70,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View
              key={index}
              style={[
                {
                  height: 50,
                  width: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  tintColor={isFocused ? BaseColor.amber : BaseColor.greyYellow}
                  source={ButtonIcons[label]}
                  style={{ height: 24, width: 24 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: isFocused ? BaseColor.amber : BaseColor.greyYellow,
                    fontSize: (Dimensions.get('window').width * 3.1) / 120,
                    alignItems: 'center',
                    marginTop: 6,
                    fontFamily: FontFamily.Poppins_Medium,
                  }}>
                  {ButtonNames[label]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
