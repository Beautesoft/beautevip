import React from 'react';
import { View, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIOS from 'react-native-vector-icons/FontAwesome5'; // Replace with the correct library for iOS

const MyIcon = Platform.OS === 'ios' ? IconIOS : Icon;

const SocialMediaIcons = ({ navigation }) => {
    const openUrl = (url) => {
      Linking.openURL(url);
    };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <MyIcon name="map-marker" size={30} color="#34B7F1" 
            onPress={() =>openUrl('https://www.google.com/maps/search/2+venture+drive+vision+exchange/@1.3299972,103.7423089,17z/data=!3m1!4b1?entry=ttu')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <MyIcon name="instagram" size={30} color="#E1306C"
        onPress={() =>openUrl('https://www.instagram.com/stories/kireibeauty.sg/3244937424275034076/')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <MyIcon name="facebook" size={30} color="#1877F2" 
            onPress={() =>openUrl('https://www.facebook.com/kireibeauty.sg')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <MyIcon name="whatsapp" size={30} color="#25D366" 
        onPress={() =>openUrl('https://web.whatsapp.com')}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
});

export default SocialMediaIcons;
