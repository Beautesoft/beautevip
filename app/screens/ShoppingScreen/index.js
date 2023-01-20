import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CText from '../../components/CText';
import ProductContainer from '../../components/ProductContainer';
import { getApiData } from '../../config/apiHelper';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import { styledFunc } from './styles';
import Toast from 'react-native-simple-toast';
import { isEmpty } from 'lodash';
import { t } from 'i18next';
import CLoader from '../../components/CLoader';
import { useIsFocused } from '@react-navigation/core';
import { baseUrl } from '../../config/settings';
export default function ShoppingScreen({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();
  const [selectedTab, setselectedTab] = useState({
    id: 1,
    title: t('forYou'),
  });

  const [productList, setproductList] = useState([]);
  const [filterArr, setfilterArr] = useState([]);
  const [searchTxt, setsearchTxt] = useState('');
  const [bCount, setitemCount] = useState(0);
  const [refreshing, setrefreshing] = useState(false);

  const [loader, setloader] = useState(false);

  const tabArr = [
    {
      id: 1,
      title: t('forYou'),
    },
    {
      id: 2,
      title: t('bestSellers'),
    },
    {
      id: 3,
      title: t('newArrivals'),
    },
  ];

  const productArr = [
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
    {
      image: Images.sampleOne,
      name: 'Shapoo 01',
      price: 10.0,
    },
  ];

  let backPressed = 0;

  function handleBackButtonClick() {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      Toast.show('Press Again To Exit');
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const GetCartItemList = () => {
    setloader(true);
    const url =
      // BaseSetting.api +
      `${baseUrl}api/cartItemList?siteCode=${userData?.siteCode}&phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}`;
    console.log(
      '🚀 ~ file: index.js ~ line 39 ~ GetCartItemList ~ userData?.customerCode',
      url,
    );

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(
          '🚀 ~ file: index.js ~ line 28 ~ .then ~ result GetCartItemList',
          result?.result.length,
        );
        if (result?.success == 1) {
          setitemCount(result?.result.length);
        }
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };
  useEffect(() => {
    StoreDetails(1);
  }, []);
  useEffect(() => {
    GetCartItemList();
  }, [isFocused]);

  const StoreDetails = (sid) => {
    setloader(true);
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          var allList = [];
          for (let i = 0; i < result?.product.length; i++) {
            for (let j = 0; j < result?.product[i].items.length; j++) {
              if (sid == 2) {
                if (result?.product[i].items[j].isBestSelling) {
                  allList.push(result?.product[i].items[j]);
                }
              } else if (sid == 3) {
                if (result?.product[i].items[j].isNewArrived) {
                  allList.push(result?.product[i].items[j]);
                }
              } else {
                // if(result?.product[i].items[j].isForYou){
                allList.push(result?.product[i].items[j]);
                // }
              }
            }
          }
          //console.log("🚀 ~ line: 176:AllList>>>",allList);
          setfilterArr(allList);
          setproductList(allList);
          // setproductList(result?.product);
          // setfilterArr(result?.product);
        }
        setrefreshing(false);
        setloader(false);
      })
      .catch((err) => {
        setrefreshing(false);
        setloader(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };
  const refresh = () => {
    GetCartItemList();
  };

  const renderProducts = ({ item, index }) => {
    const productData = item;
    return (
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ProductContainer
          image={
            productData?.imageUrl
              ? { uri: productData?.imageUrl }
              : productData?.image
          }
          name={productData?.itemName}
          price={productData?.price}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              productDetails: productData,

              onGoBack: () => refresh(),
            });
          }}
          style={{ width: '90%', margin: 8 }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            style={{ height: 40, width: 40 }}
            source={Images.logoResized}
            resizeMode="center"
          />
          {/* <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <Image
              source={Icons.menu}
              tintColor={theme().darkGrey}
              style={{ height: 34, width: 34 }}
              resizeMode="center"
            />
          </TouchableOpacity> */}

          <View style={styles.searchCont}>
            <Image
              source={Icons.search}
              style={{ height: 18, width: 18 }}
              resizeMode="center"
            />
            <TextInput
              placeholder={t('search')}
              style={{
                flex: 1,
                marginStart: 12,
                marginEnd: 8,
                color: theme().yellow,
                fontSize: 14,
              }}
              value={searchTxt}
              placeholderTextColor={theme().amber}
              onChangeText={(text) => {
                // const tempArr = productList.filter((item) => {
                //   const name =
                //     item && item?.itemName ? item?.itemName.toLowerCase() : '';
                //   return name.includes(text.toLowerCase());
                // });
                setsearchTxt(text);
                const tempArr = productList.filter((item) =>
                  item?.itemName
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(text.toLowerCase().replace(/\s+/g, '')),
                );
                if (isEmpty(text)) {
                  setfilterArr(productList);
                } else {
                  setfilterArr(tempArr);
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('ShoppingBag', {
                onGoBack: () => refresh(),
              });
            }}
            activeOpacity={0.7}>
            <Image
              source={Icons.cart}
              tintColor={theme().darkGrey}
              style={{ height: 34, width: 34 }}
              resizeMode="contain"
            />
            <CText value={bCount} style={styles.badge} size={12} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 16 }}>
          <FlatList
            horizontal
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.tabCont,
                    {
                      borderColor:
                        item.id === selectedTab.id
                          ? theme().amberTxt
                          : '#434343',
                    },
                  ]}
                  onPress={() => {
                    setselectedTab(item);
                    StoreDetails(item.id);
                    console.log('SelectedTab::', selectedTab.id, item);
                  }}
                  activeOpacity={0.7}
                  key={index}>
                  <CText
                    value={item.title}
                    color={
                      item.id === selectedTab.id ? theme().amberTxt : '#434343'
                    }
                    size={14}
                  />
                </TouchableOpacity>
              );
            }}
            data={tabArr}
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={filterArr}
          renderItem={renderProducts}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <CLoader loader={loader} />
    </View>
  );
}
