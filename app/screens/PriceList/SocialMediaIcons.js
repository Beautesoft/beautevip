import React from 'react';
import { View, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use icons from other libraries

const SocialMediaIcons = ({ navigation, ...props}) => {
    const openUrl = (url) => {
      Linking.openURL(url);
    };
    const { appInstagram, appFacebook } = props;

  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="instagram" size={30} color="#E1306C"
        onPress={() =>openUrl(appInstagram)}/>
      </TouchableOpacity>
      <View style={{paddingLeft:10}}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="facebook" size={30} color="#1877F2" 
            onPress={() =>openUrl(appFacebook)}/>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
});

export default SocialMediaIcons;
