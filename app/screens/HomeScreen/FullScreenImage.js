import React from 'react';
import {  View, TouchableOpacity, Image,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from your library

const FullScreenImage = ({ route,navigation }) => {
  const { width, height } = Dimensions.get('window');
  const acyHeightValue = height * 0.9; // Adjust the percentage as needed
  const imageWidth = width - 20; // Adjust the width as needed


  const { priceListBannerImageURL } = route.params;

  return (
    <View style={{ position: 'absolute', alignSelf: 'center', top: 30, padding: 10 }}>
      <Image
        style={{ height: acyHeightValue, width: imageWidth, borderRadius: 0 }}
        source={{ uri: priceListBannerImageURL }}
      />
         <View
              style={{
                position: 'absolute',
                top: acyHeightValue,
                right: 10,
                backgroundColor: '#F5F5DC', // Add your desired background color here
                borderRadius: 15,
                padding: 5,
              }}
            >
              <TouchableOpacity
                onPress={() =>navigation.goBack()}
              >
                <Icon name="long-arrow-left" size={28} color="black" />
              </TouchableOpacity>
            </View>
    </View>
  );
};

export default FullScreenImage;
