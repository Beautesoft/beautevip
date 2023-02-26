import { t } from 'i18next';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import CLoader from '../../components/CLoader';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import BaseSetting from '../../config/settings';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
export default function ProductDetails({ navigation, route }) {
  const styles = styledFunc();
  const productDetails = route?.params?.productDetails;
  const { userData } = useSelector((state) => state.auth);
  const [loader, setloader] = useState(false);

  const [selectedQuantity, setselectedQuantity] = useState(1);
  const [showQuantity, setshowQuantity] = useState(false);

  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const AddToCart = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      itemCode: productDetails?.itemCode,
      itemDescription: productDetails?.itemDescription,
      itemQuantity: selectedQuantity,
      itemPrice: productDetails?.price,
      siteCode: productDetails?.siteCode,
      redeemPoint: '0',
      itemType: 1,
    };
    getApiData(BaseSetting?.endpoints?.cartItemInput, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 33 ~ .then ~ result', result);
        if (result?.success == 1) {
          navigation.goBack();
          Toast.show('Added to cart.');
          // navigation.navigate('ShoppingScreen');
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 35 ~ .then ~ err', err);
      });
  };

  return (
    <>
      <CHeader
        title={t('productDetails')}
        showLeftIcon
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Image
            source={
              productDetails?.imageUrl
                ? { uri: productDetails?.imageUrl }
                : Images.sampleOne
            }
            resizeMode="cover"
            style={{ height: 280, width: '100%' }}
          />
          <View style={{ padding: 12 }}>
            <CText
              value={productDetails?.itemName}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_Medium}
            />
            <CText
              value={productDetails?.salonName}
              color={theme().white}
              size={14}
            />
            <CText
              value={`Price : $${productDetails?.price}`}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_SemiBold}
              style={{
                marginTop: 16,
              }}
            />
            <CText
              value={productDetails?.itemDescription}
              color={theme().white}
              size={15}
              style={{
                marginTop: 8,
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.aTCCOnt}>
          <TouchableOpacity
            style={styles.dropCont}
            activeOpacity={0.7}
            onPress={() => {
              setshowQuantity(true);
            }}>
            <Text style={styles.dropValue}>{selectedQuantity}</Text>
            <Image
              style={{ height: 16, width: 16, tintColor: theme().black }}
              resizeMode="center"
              source={Icons.drop_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              AddToCart();
            }}>
            <CText
              value={t('addToCart')}
              color={theme().black}
              size={20}
              fontFamily={FontFamily.Poppins_Medium}
            />
          </TouchableOpacity>
        </View>
        <CLoader loader={loader} />
        <Modal style={{ flex: 1 }} transparent visible={showQuantity}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000070',
            }}>
            <View
              style={{
                height: 350,
                backgroundColor: theme().white,
                width: '90%',
                borderRadius: 8,
              }}>
              <FlatList
                data={quantity}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        padding: 8,
                        borderBottomWidth: 1,
                        borderColor: theme().black,
                        borderRadius: 8,
                      }}
                      onPress={() => {
                        setshowQuantity(false);
                        setselectedQuantity(item);
                      }}>
                      <CText
                        value={item}
                        color={theme().black}
                        size={20}
                        fontFamily={FontFamily.Poppins_Medium}
                        style={{
                          textAlign: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
