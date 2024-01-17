import React from 'react';
import { View, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use icons from other libraries

const SocialMediaIcons = ({ navigation }) => {
    const openUrl = (url) => {
      Linking.openURL(url);
    };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="instagram" size={30} color="#E1306C"
        onPress={() =>openUrl('https://www.instagram.com/stories/kireibeauty.sg/3244937424275034076/')}/>
      </TouchableOpacity>
      <View style={{paddingLeft:10}}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="facebook" size={30} color="#1877F2" 
            onPress={() =>openUrl('https://www.facebook.com/kireibeauty.sg')}/>
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
