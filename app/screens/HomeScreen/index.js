import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import { styledFunc } from './styles';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import CText from '../../components/CText';
import CircularButton from '../../components/CirculerButton';
import ProductContainer from '../../components/ProductContainer';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../../config/apiHelper';
import CLoader from '../../components/CLoader';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { LogBox } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { Modal, Pressable } from 'react-native';//this is for android
export default function HomeScreen({ navigation }) {
  const styles = styledFunc();
  const { logout, setStoreData, addBookingData } = AuthAction;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { clientDetails } = useSelector((state) => state.auth);
  const bannerListRef = useRef();

  const [searchTxt, setsearchTxt] = useState('');
  const [curIndex, setcurIndex] = useState(0);
  const [hStoreData, sethStoreData] = useState({});
  const [serviceList, setserviceList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [sallonDetail, setSallonDetail] = useState([]);
  const [productList, setproductList] = useState([]);
  const [filterArr, setfilterArr] = useState([]);

  const [loader, setloader] = useState(false);

  const [refreshing, setrefreshing] = useState(false);
  const [banner, setBanner] = useState([]);
  const [isBannerUri, setIsBannerUri] = useState(false);
  const [priceListImageModal, setPriceListImageModal] = useState(false);
  const [priceListBannerImageURL, setPriceListBannerImageURL] = useState("");
  const [IsRenderPriceList, SetIsRenderPriceList] = useState(false);
  const [IsRenderTermsAndCondition, SetIsRenderTermsAndCondition] = useState(false);
  const [IsRenderLocation, SetIsRenderLocation] = useState(false);
  const [IsRenderButtonGroup, SetIsRenderButtonGroup] = useState(true);
  const bannerDefault = [
    {
      bannerImg: Images.sampleOne,
    },
    {
      bannerImg: Images.sampleOne,
    },
    {
      bannerImg: Images.sampleOne,
    },
    {
      bannerImg: Images.sampleOne,
    },
  ];

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

  const [selectedTab, setselectedTab] = useState({
    id: 1,
    title: t('forYou'),
  });



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

  function openPriceListModal(item) {
    setPriceListImageModal(true);
    setPriceListBannerImageURL(item?.bannerImg)
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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    StoreDetails(1);
    getDepartment();
    getSallonDetail();
  }, []);

  const onRefresh = () => {
    setrefreshing(true);
    StoreDetails(selectedTab.id);
    getDepartment();
  };

  const serviceAction = (item) => {
    if (clientDetails?.isEnableAddtoCart == "Yes") {
      dispatch(addBookingData('oldflow'));
      navigation.navigate('RangeScreen', { serviceData: item });
    }
  };
  const StoreDetails = (sid) => {
    setloader(true);
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          //console.log('result home page----->', userData, result);
          //console.log("response_product_data", result?.product);
          //console.log("response_service", result?.service);
          //console.log("response_product_data_images", result?.product[0].items);
          sethStoreData(result);
          setserviceList(result?.service);
          setPriceList(result?.pricelist);
          setTermsAndConditions(result?.termsAndConditions);
          // setproductList(result?.product);
          // setfilterArr(result?.product);
          if (result?.banners.length > 0) {
            setIsBannerUri(true);
            setBanner(result?.banners);
          } else {
            setIsBannerUri(false);
            setBanner(bannerDefault);
          }
          // let bannerImg = [
          //   {
          //     bannerImg:
          //       'https://plus.unsplash.com/premium_photo-1661764146760-cc945ab351e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
          //   },
          //   {
          //     bannerImg:
          //       'https://plus.unsplash.com/premium_photo-1661764146760-cc945ab351e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
          //   },
          // ];
          // setBanner(bannerImg);
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
        }
        setrefreshing(false);
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        setrefreshing(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };

  const getDepartment = () => {
    const url = `/department?siteCode=${userData?.siteCode}`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          // setserviceList(result?.result);
        }
        setrefreshing(false);
      })
      .catch((err) => {
        setrefreshing(false);
        console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };
  const getSallonDetail = () => {
    const url = `/getSallonDetail?siteCode=${userData?.siteCode}&userID=&hq=`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          setSallonDetail(result?.result);
          //console.log("getSallonDetail", result?.result)
        }
        setrefreshing(false);
      })
      .catch((err) => {
        setrefreshing(false);
        //console.log('🚀 ~ file: index.js ~ line 149 ~ .then ~ err', err);
      });
  };

  const handleNavigationPriceList = () => {
    try {
      if (priceList?.length === 0) {
        Toast.show('No Records');
      }
      else if (priceList?.length === 1) {
        navigation.navigate('FullScreenImage', { priceListBannerImageURL: priceList[0]?.bannerImg });
      } else {
        navigation.navigate('PriceList', { type: 'price', data: banner, pricelist: priceList, termsAndConditions: termsAndConditions });
      }
    } catch (error) {
      console.error('Error navigating to terms:', error);
      // Handle the error as needed, such as showing an alert to the user
    }
  };

  const handleNavigationTerms = () => {
    try {
      if (termsAndConditions?.length === 0) {
        Toast.show('No Records');
      }
      else if (termsAndConditions?.length === 1) {
        navigation.navigate('FullScreenImage', { priceListBannerImageURL: termsAndConditions[0]?.bannerImg });
      } else {
        navigation.navigate('PriceList', { type: 'terms', data: banner, pricelist: priceList, termsAndConditions: termsAndConditions });
      }
    } catch (error) {
      console.error('Error navigating to terms:', error);
      // Handle the error as needed, such as showing an alert to the user
    }
  };

  const handleNavigationLocation = () => {
    navigation.navigate('PriceList', { type: 'location', data: banner,pricelist:priceList,termsAndConditions:termsAndConditions });
  };



  const handleLogout = () =>
    Alert.alert(
      'Log Out !',
      'Are you Sure ? ',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(logout()),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  const renderServiceBtn = ({ item, index }) => {
    return (
      <View
        style={{
          width: '33%',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <CircularButton
          iconSrouce={
            item?.imageUrl
              ? { uri: item?.imageUrl }
              : item?.imageUrl
          }
          title={item?.departmentName}
          onPress={() => serviceAction(item)}
        />
      </View>
    );
  };

  const renderPriceList = ({ item, index }) => {
    return (
      <View
        style={{
          width: '25%',
          alignItems: 'center',
          marginTop: 6,
        }}>
        <CircularButton
          iconSrouce={
            item?.bannerIcon
              ? { uri: item?.bannerIcon }
              : item?.bannerIcon
          }
          onPress={() => openPriceListModal(item)}
        />
      </View>
    );
  };
  const renderTermsAndCondition = ({ item, index }) => {
    return (
      <View
        style={{
          width: '25%',
          alignItems: 'center',
          marginTop: 6,
        }}>
        <CircularButton
          iconSrouce={
            item?.bannerIcon
              ? { uri: item?.bannerIcon }
              : item?.bannerIcon
          }
          onPress={() => openPriceListModal(item)}
        />
      </View>
    );
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
            });
          }}
          style={{ width: '90%', margin: 8 }}
        />
      </View>
    );
  };

  const onViewRef = React.useRef(({ viewableItems, changed }) => {
    setcurIndex(changed[0].index);
    // Use viewable items in state or as intended
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    if (banner.length > 0) {
      const interval = setInterval(() => {
        let index = curIndex;
        bannerListRef.current.scrollToIndex({
          index: index == banner.length - 1 ? 0 : index + 1,
          // index: ++index,
          animated: true,
        });
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [banner, curIndex]);

  return (
    <View style={{ backgroundColor: theme().darkGrey, flex: 1 }}>
      <View style={styles.headerCont}>

        <Image
          style={{ borderRadius:24, height: 48, width: 40 }}
          source={{ uri: clientDetails?.clientLogo }}
          resizeMode="center"
        />
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
     
          <View style={styles.searchCont}>
          {clientDetails?.isShowProducts == "Yes" &&
            <Image
              source={Icons.search}
              style={{ height: 18, width: 18 }}
              resizeMode="center"
            />
  }
     {clientDetails?.isShowProducts == "Yes" &&
              <TextInput
                placeholder={t('searchProducts')}
                style={{
                  marginStart: 12,
                  marginEnd: 8,
                  color: theme().yellow,
                  fontSize: 14,
                }}
                value={searchTxt}
                placeholderTextColor={theme().amber}
                onChangeText={setsearchTxt}
                onChange={() => {
                  const tempArr = productList.filter((item) =>
                    item?.itemName
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(searchTxt.toLowerCase().replace(/\s+/g, '')),
                  );
                  // const tempArr = productList.filter((item) => {

                  //   const name =
                  //     item && item?.itemName ? item?.itemName.toLowerCase() : '';
                  //   return name.includes(searchTxt.toLowerCase());
                  // });
                  if (!!searchTxt) {
                    setfilterArr(tempArr);
                  } else {
                    setfilterArr(productList);
                  }
                }}
                resizeMode="center"
              /> }
          </View>
        
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={Icons.notification_o}
              style={{ height: 48, width: 40 }}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleLogout()}>
            <Image
              source={Icons.exit_o}
              style={{ height: 48, width: 40 }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // padding: 8,
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        <View>
          <View>
            <FlatList
              ref={bannerListRef}
              horizontal={true}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.mainCont}>
                    <View style={styles.scrollImgCont} key={index}>
                      <Image
                        source={
                          isBannerUri ? { uri: item.bannerImg } : item.bannerImg
                        }
                        style={styles.scrollImg}
                      />
                    </View>
                  </View>
                );
              }}
              data={banner}
              pagingEnabled
            />
          </View>

          <View style={styles.dotConSty}>
            {banner.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.dotSty,
                    {
                      backgroundColor:
                        curIndex === index ? theme().amber : theme().darkAmber,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        {clientDetails?.isShowServices == "Yes" &&
          <View style={{ padding: 12 }}>
            <View style={styles.contHeader}>
              <CText value={t('services')} size={20} color={theme().amberTxt} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ServiceScreen')}>
                <CText value={t('viewAll')} size={14} color={theme().darkAmber} />
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView
                showsHorizontalScrollIndicator
                style={{ height: 'auto' }}
              >
                <FlatList
                  numColumns={3}
                  data={serviceList}
                  renderItem={renderServiceBtn}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexGrow: 1,
                  }}
                  keyExtractor={(item, index) => index}
                />

              </ScrollView>
            </View>
          </View>
        }
        {IsRenderPriceList &&
          <ScrollView
            showsHorizontalScrollIndicator
            style={{ height: 'auto' }}>
            <FlatList
              data={priceList}
              keyExtractor={(item, index) => index}
              renderItem={renderPriceList}
              contentContainerStyle={{
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
              numColumns={4}
            />
          </ScrollView>
        }
        {IsRenderTermsAndCondition &&
          <ScrollView
            showsHorizontalScrollIndicator
            style={{ height: 'auto' }}>
            <FlatList
              data={termsAndConditions}
              keyExtractor={(item, index) => index}
              renderItem={renderTermsAndCondition}
              contentContainerStyle={{
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
              numColumns={4}
            />
          </ScrollView>
        }
        {clientDetails?.isShowProducts == "Yes" ?
          <View style={{ padding: 12 }}>
            <View style={styles.contHeader}>
              <CText value="Products" size={20} color={theme().amberTxt} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ShoppingScreen')}>
                <CText value={t('viewAll')} size={14} color={theme().darkAmber} />
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                horizontal={true}
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
                              : theme().color_434343,
                        },
                      ]}
                      onPress={() => {
                        //        const tempArr = productList.filter((item) => {
                        //   const name = item.itemName.toLowerCase();
                        //   return name.includes(searchTxt.toLowerCase());
                        // });

                        setselectedTab(item);
                        StoreDetails(item.id);
                      }}
                      activeOpacity={0.7}
                      key={index}>
                      <CText
                        value={item.title}
                        color={
                          item.id === selectedTab.id
                            ? theme().amberTxt
                            : theme().color_434343
                        }
                        size={14}
                      />
                    </TouchableOpacity>
                  );
                }}
                data={tabArr}
              />
            </View>

            <View>
              <FlatList
                keyExtractor={(item, index) => index}
                data={filterArr}
                renderItem={renderProducts}
                scrollEnabled={false}
                numColumns={2}
                contentContainerStyle={{ marginTop: 16 }}
              />
            </View>
          </View> :
          null
        }
        {IsRenderLocation &&
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: clientDetails?.clientLogo }}
                style={{ justifyContent: 'flex-start', height: 100, width: '100%' }}
                resizeMode="center"
              />

            </View>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <CText value={sallonDetail[0]?.siteName} size={14} />
              <CText value={sallonDetail[0]?.Location} size={14} />
            </View>
          </View>
        }
        {IsRenderButtonGroup &&
          <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E5D0BF' }]} onPress={handleNavigationPriceList}>
              <Text style={styles.buttonText}>Price List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E5D0BF' }]} onPress={handleNavigationTerms}>
              <Text style={styles.buttonText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E5D0BF' }]} onPress={handleNavigationLocation}>
              <Text style={styles.buttonText}>General Info</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>

      {/* </View> */}


      <CLoader loader={loader} />
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
    </View>
  );
}
