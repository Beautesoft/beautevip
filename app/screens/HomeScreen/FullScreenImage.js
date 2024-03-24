import React from 'react';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from your library

const FullScreenImage = ({ route, navigation }) => {
  const { width, height } = Dimensions.get('window');
  const imageWidth = width; // Set image width to full screen width
  const imageHeight = height * 0.9; // Adjust the percentage as needed
  const iconSize = 28; // Adjust the size of the back button icon

  const { priceListBannerImageURL } = route.params;
  console.log("priceListBannerImageURL", priceListBannerImageURL);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: imageWidth, height: imageHeight, resizeMode: 'contain' }}
        source={{ uri: priceListBannerImageURL }}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="long-arrow-left" size={iconSize} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#F5F5DC', // Add your desired background color here
    borderRadius: 15,
    padding: 5,
  },
});

export default FullScreenImage;
