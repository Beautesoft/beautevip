import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, Image, Linking,Alert } from 'react-native';
import CHeader from '../../components/CHeader';
import BannerCarousel from '../Shared/Banner/BannerCarousel';
import { Modal, Pressable } from 'react-native';//this is for android
import { theme } from '../../redux/reducer/theme';
import CText from '../../components/CText';
import SocialMediaIcons from './SocialMediaIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use icons from other libraries
import { ScrollView } from 'react-native';
import { baseUrl } from '../../config/settings';
import Toast from 'react-native-simple-toast';
import { getApiData } from '../../config/apiHelper';

const { width } = Dimensions.get('window');

const PriceList = ({ route, navigation }) => {
  useEffect(() => {
    GetSaloonList();
    getBanners();
  }, []);
  const { type, data } = route.params;
  const [priceListImageModal, setPriceListImageModal] = useState(false);
  const [priceListBannerImageURL, setPriceListBannerImageURL] = useState("");
  const [SaloonList, setSaloonList] = useState([]);
  const [isGetSaloonListEndpointSuccess, setGetSaloonListEndpointSuccess] = useState(false);
  const [pricelist, setPricelist] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  
  // Assuming the API response looks like this
  const resetFlow = !!route.params?.resetFlow;
  const { clientDetails } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);
  const GetSaloonList = () => {
    const url = `${baseUrl}api/getSaloonList?&siteCode=${userData?.siteCode}&userID`;
    //console.log("GetSaloonList-url", url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json?.success == 1) {
          //console.log("GetSaloonList-Response : ", json?.result[0]);
          setSaloonList(json?.result[0]);
          setGetSaloonListEndpointSuccess(true);
        }
        else {
          if (type === 'location') {
            Toast.show(json?.error);
            console.log("GetSaloonList-Response : ", json);
            setGetSaloonListEndpointSuccess(false);
          }
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBanners = () => {
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    console.log('dashBoardF21-Request', url);

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          setPricelist(result?.pricelist);
          setTermsAndConditions(result?.termsAndConditions);
          console.log('dashBoardF21-Response-for-pricelist', result?.pricelist);
          console.log('dashBoardF21-Response-for-pricelist', result?.termsAndConditions);
        }
      })
      .catch((err) => {
        console.log('dashBoardF21-error', err);
      });
  };

  const buttonWidth = 0.8 * width; // 80% of screen width

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: '#E5D0BF', width: buttonWidth, height: 60 }]} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.bannerName}</Text>
    </TouchableOpacity>
  );

  const renderItemForTermsAndConditions = ({ item }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: '#E5D0BF', width: buttonWidth, height: 60 }]} onPress={() => handleButtonPress(item)}>
      <Text style={styles.buttonText}>{item.bannerName}</Text>
    </TouchableOpacity>
  );


  const handleButtonPress = (buttonData) => {
    setPriceListImageModal(true);
    console.log('Button pressed:', buttonData.bannerName);
    setPriceListBannerImageURL(buttonData?.bannerImg);
  };

  const openUrl = (url) => {
    if (url && typeof url === 'string' && url.trim() !== '') {
      Linking.openURL(url);
    } else {
      Alert.alert('Warning!', 'Please check the URL');
    }
  };
  return (
    <>
      <CHeader
        title={type == 'price' ? 'Price List' : type == 'terms' ? 'Terms & Condition' : 'General Info'}
        showLeftIcon
        onLeftIconPress={() =>
          navigation.navigate("BottomTabsNavigator")}
      />
      <ScrollView>
        <BannerCarousel bannerData={data} />
        {type == 'price' &&
          <View style={styles.container}>
            <FlatList
              data={pricelist}
              keyExtractor={(item) => item.bannerID.toString()}
              renderItem={renderItem}
              numColumns={1} // Use 1 column to display buttons vertically
            />
          </View>
        }
        {type == 'terms' &&
          <View style={styles.container}>
            <FlatList
              data={termsAndConditions}
              keyExtractor={(item) => item.bannerID.toString()}
              renderItem={renderItemForTermsAndConditions}
              numColumns={1} // Use 1 column to display buttons vertically
            />
          </View>
        }
        {(type === 'location' && isGetSaloonListEndpointSuccess) &&
          <View style={{ padding: 10, paddingLeft: 20 }}>
            <View style={{ flexDirection: "row", paddingLeft: 20 }}>
              <View style={{ flex: 0 }}>
                <Image
                  source={{ uri: clientDetails?.clientLogo }}
                  style={{
                    borderRadius: 50,
                    height: 100,
                    width: 100,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    paddingLeft: 30,
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}
                  resizeMode="center"
                />
              </View>
              <View style={{ flex: 1, paddingLeft: 24 }}>
                <CText value={SaloonList.appOutletName} size={24} />
                <CText value={SaloonList.appPriceDescription} size={24} />
              </View>

            </View>
            <View>
              <CText value={SaloonList.appContactUs} size={18} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>



              <CText value="Whatsapp us" size={18} />
              <TouchableOpacity style={{ paddingLeft: 20 }}>
                <Icon name="whatsapp" size={28} color="#25D366" onPress={() => openUrl(SaloonList.appWhatsApp)} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <CText value={SaloonList.appAddress} size={18} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CText value="Google  Link :" size={18} style={{ textDecorationLine: 'underline' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingRight: 20 }}>
                <Icon
                  name="map-marker"
                  size={30}
                  color="#34B7F1"
                  onPress={() => openUrl(SaloonList.appMap)}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CText value="Social Link :" size={18} style={{ textDecorationLine: 'underline' }} />
            </View>

            <SocialMediaIcons appInstagram={SaloonList.appInstagram} appFacebook={SaloonList.appFacebook} />
          </View>
        }
      </ScrollView>

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


              <Image
                style={{ height: 550, width: 300, borderRadius: 10 }}
                source={{ uri: priceListBannerImageURL }}
              />
              {/* Separate View for Back arrow icon */}
              <View
                style={{
                  position: 'absolute',
                  top: 570, // Adjust the top value as needed
                  right: 10,
                  backgroundColor: '#F5F5DC', // Add your desired background color here
                  borderRadius: 15, // Optional: Add borderRadius for a rounded background
                  padding: 5,
                }}
              >
                {/* Back arrow icon with increased size and red color */}
                <TouchableOpacity
                  onPress={() => setPriceListImageModal(false)}
                >
                  <Icon name="long-arrow-left" size={28} color="black" />
                </TouchableOpacity>
              </View>

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
    color: 'black',
    fontSize: 32,
    fontFamily: 'BebasNeue-Regular',
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