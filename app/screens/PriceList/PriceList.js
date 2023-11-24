import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import CHeader from '../../components/CHeader';
import BannerCarousel from '../Shared/Banner/BannerCarousel';
import { Modal, Pressable } from 'react-native';//this is for android
import { theme } from '../../redux/reducer/theme';
const { width } = Dimensions.get('window');

const PriceList = ({ route, navigation }) => {
  const { type, data } = route.params;
  const [priceListImageModal, setPriceListImageModal] = useState(false);
  const [priceListBannerImageURL, setPriceListBannerImageURL] = useState("");
  // Assuming the API response looks like this
  const resetFlow = !!route.params?.resetFlow;
  const apiResponse = [
    {
      "bannerID": 9,
      "bannerName": "Lash By Director",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_pricelist4.jpeg",
      "bannerDesc": "Lash By Director",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Pricelist1.png"
    },
    {
      "bannerID": 5,
      "bannerName": "Lash By Manager",
      "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_Pricelist2.jpeg",
      "bannerDesc": "Lash By Manager",
      "termsAndCondition": "",
      "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/LashbyManager.png"
    },
    {
      "bannerID": 8,
      "bannerName": "Lash By Staff",
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
            "bannerName": "Terms and Condition 1",
            "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms1.jpeg",
            "bannerDesc": "Terms and Condition 1",
            "termsAndCondition": "",
            "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/BookingConditions.png"
        },
        {
            "bannerID": 7,
            "bannerName": "Terms and Condition 2",
            "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms2.jpeg",
            "bannerDesc": "Terms and Condition 2",
            "termsAndCondition": "",
            "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/RetentionConditions.png"
        },
        {
            "bannerID": 10,
            "bannerName": "Terms and Condition 3",
            "bannerImg": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/Banner_KBHQ_terms3.jpeg",
            "bannerDesc": "Terms and Condition 3",
            "termsAndCondition": "",
            "bannerIcon": "http://sequoiasg.ddns.net:7049/wellness/KBHQ/ReschedulePolicy.png"
        },
        {
            "bannerID": 11,
            "bannerName": "Terms and Condition 4",
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
      <Text style={styles.buttonText}>{item.bannerDesc}</Text>
    </TouchableOpacity>
  );

  const renderItemForTermsAndConditions = ({ item }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: '#70ad47', width: buttonWidth, height: 60 }]} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.bannerDesc}</Text>
    </TouchableOpacity>
  );


  const handleButtonPress = (buttonData) => {
    setPriceListImageModal(true);
    console.log('Button pressed:', buttonData.bannerDesc);
    setPriceListBannerImageURL(buttonData?.bannerImg);
  };


  return (
    <>
      <CHeader
        title={'Price List'}
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
});

export default PriceList;