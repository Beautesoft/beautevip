import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import CHeader from '../../components/CHeader';
import BannerCarousel from '../Shared/Banner/BannerCarousel';
import { Modal, Pressable } from 'react-native';//this is for android
import { theme } from '../../redux/reducer/theme';
import CText from '../../components/CText';
import SocialMediaIcons from './SocialMediaIcons';
const { width } = Dimensions.get('window');

const PriceList = ({ route, navigation }) => {
  const { type, data } = route.params;
  const [priceListImageModal, setPriceListImageModal] = useState(false);
  const [priceListBannerImageURL, setPriceListBannerImageURL] = useState("");
  // Assuming the API response looks like this
  const resetFlow = !!route.params?.resetFlow;
  const { clientDetails } = useSelector((state) => state.auth);

  const apiResponse = [
    {
      "bannerID": 9,
      "bannerName": "Director Price List",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_pricelist4.jpeg",
      "bannerDesc": "Lash By Director",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Pricelist1.png"
    },
    {
      "bannerID": 5,
      "bannerName": "Manager Price List",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_Pricelist2.jpeg",
      "bannerDesc": "Lash By Manager",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/LashbyManager.png"
    },
    {
      "bannerID": 8,
      "bannerName": "Staff Price List",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_pricelist3.jpeg",
      "bannerDesc": "Lash By Staff",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/LashbyStaff.png"
    }
    // ... more button data from API
  ];

  const apiResponseForTermsAndCondition = [
    {
      "bannerID": 6,
      "bannerName": "Booking",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms1.jpeg",
      "bannerDesc": "Terms and Condition 1",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/BookingConditions.png"
    },
    {
      "bannerID": 7,
      "bannerName": "Retention Conditions",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms2.jpeg",
      "bannerDesc": "Terms and Condition 2",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/RetentionConditions.png"
    },
    {
      "bannerID": 10,
      "bannerName": "Reschedule Policy",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms3.jpeg",
      "bannerDesc": "Terms and Condition 3",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/ReschedulePolicy.png"
    },
    {
      "bannerID": 11,
      "bannerName": "Terms and Conditions",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms4.jpeg",
      "bannerDesc": "Terms and Condition 4",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/TermsAndConditions.png"
    },
    // ... more button data from API
  ];
  const buttonWidth = 0.8 * width; // 80% of screen width

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: 'orange', width: buttonWidth, height: 60 }]} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.bannerName}</Text>
    </TouchableOpacity>
  );

  const renderItemForTermsAndConditions = ({ item }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: '#70ad47', width: buttonWidth, height: 60 }]} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.bannerName}</Text>
    </TouchableOpacity>
  );


  const handleButtonPress = (buttonData) => {
    setPriceListImageModal(true);
    console.log('Button pressed:', buttonData.bannerName);
    setPriceListBannerImageURL(buttonData?.bannerImg);
  };


  return (
    <>
      <CHeader
        title={type == 'price' ? 'Price List' : type == 'terms' ? 'Terms & Condition' : 'Location'}
        showLeftIcon
        onLeftIconPress={() =>
          navigation.navigate("BottomTabsNavigator")}
      />
      <BannerCarousel bannerData={data} />
      {type == 'price' &&
        <View style={styles.container}>
          <FlatList
            data={apiResponse}
            keyExtractor={(item) => item.bannerID.toString()}
            renderItem={renderItem}
            numColumns={1} // Use 1 column to display buttons vertically
          />
        </View>
      }
      {type == 'terms' &&
        <View style={styles.container}>
          <FlatList
            data={apiResponseForTermsAndCondition}
            keyExtractor={(item) => item.bannerID.toString()}
            renderItem={renderItemForTermsAndConditions}
            numColumns={1} // Use 1 column to display buttons vertically
          />
        </View>
      }
      {type == 'location' &&
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0 }}>
              <Image
                source={{ uri: clientDetails?.clientLogo }}
                style={{
                  borderRadius: 50,
                  height: 100,
                  width: 100,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}
                resizeMode="center"
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <CText value="Kirei Beauty" size={24} />
              <CText value="All Nett Price !" size={24} />
            </View>

          </View>
          <View style={{paddingLeft:10}}>
            <CText value="Address : 2 Venture drive #02-26, Vision Exchange" size={18} />
          </View>
          <SocialMediaIcons/>
        </View>
      }

      <Modal
        style={{ flex: 1 }}
        transparent
        visible={priceListImageModal}
        animationType="slide">

        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#ffffff40',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}>

          <View
            style={{
              padding: 8,
              backgroundColor: theme().always_white,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
            }}>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 10,
                padding: 10,

              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setPriceListImageModal(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>

              <Image
                style={{ height: 550, width: 300, borderRadius: 10 }}
                source={{ uri: priceListBannerImageURL }}
              />


            </View>

          </View>
        </TouchableOpacity>
      </Modal>


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 1,
  },
  button: {
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PriceList;