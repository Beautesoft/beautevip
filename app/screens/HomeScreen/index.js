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
  const [productList, setproductList] = useState([]);
  const [filterArr, setfilterArr] = useState([]);

  const [loader, setloader] = useState(false);

  const [refreshing, setrefreshing] = useState(false);
  const [banner, setBanner] = useState([]);
  const [isBannerUri, setIsBannerUri] = useState(false);

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
  }, []);

  const onRefresh = () => {
    setrefreshing(true);
    StoreDetails(selectedTab.id);
    getDepartment();
  };

  const serviceAction = (item) => {
    dispatch(addBookingData('oldflow'));
    navigation.navigate('RangeScreen', { serviceData: item });
  };
  const StoreDetails = (sid) => {
    setloader(true);
    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          console.log('result home page----->', userData, result);
          sethStoreData(result);
          setserviceList(result?.service);
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
          iconResource={item.image}
          title={item?.departmentName}
          onPress={() => serviceAction(item)}
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
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [banner, curIndex]);

  return (
    <View style={{ backgroundColor: theme().darkGrey, flex: 1 }}>
      <View style={styles.headerCont}>

        <Image
          style={{ height: 48, width: 40 }}
          source={{ uri: clientDetails?.clientLogo }}
          resizeMode="center"
        />
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>

          <View style={styles.searchCont}>
            <Image
              source={Icons.search}
              style={{ height: 18, width: 18 }}
              resizeMode="center"
            />
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
            /> 
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={Icons.notification_o}
              style={{
                marginHorizontal: 8,
                marginEnd: 8,
                height: 22,
                width: 22,
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleLogout()}>
            <Image
              source={Icons.exit_o}
              style={{
                height: 22,
                width: 22,
                marginHorizontal: 8,
                marginStart: 8,
              }}
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
          </View>
        </View>

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
        </View>
      
      </ScrollView>
      {/* </View> */}
      <CLoader loader={loader} />
    </View>
  );
}
