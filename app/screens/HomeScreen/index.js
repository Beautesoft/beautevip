import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  BackHandler,
} from 'react-native';
import styles from './styles';
import BaseColor from '../../config/colors';
import { Icons } from '../../config/icons';
import { Images } from '../../config/images';
import CText from '../../components/CText';
import CircularButton from '../../components/CirculerButton';
import ProductContainer from '../../components/ProductContainer';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/settings';
import { getApiData } from '../../config/apiHelper';
import { useFocusEffect } from '@react-navigation/core';
import Loader from '../../components/Loader';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import { LogBox } from 'react-native';

export default function HomeScreen({ navigation }) {
  const statisData = 1;
  const { logout, setStoreData } = AuthAction;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const bannerListRef = useRef();

  const [searchTxt, setsearchTxt] = useState('');
  const [curIndex, setcurIndex] = useState(0);
  const [hStoreData, sethStoreData] = useState({});
  const [serviceList, setserviceList] = useState([]);
  const [productList, setproductList] = useState([]);
  const [filterArr, setfilterArr] = useState([]);

  const [loader, setloader] = useState(false);

  const [refreshing, setrefreshing] = useState(false);

  const imageArr = [
    {
      image: Images.sampleOne,
    },
    {
      image: Images.sampleOne,
    },
    {
      image: Images.sampleOne,
    },
    {
      image: Images.sampleOne,
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

  const StoreDetails = (sid) => {
    setloader(true);

    const url = `/dashBoardF21?siteCode=${userData?.siteCode}&customerCode=${userData?.customerCode}`;
    // const url = `/dashBoardF21?siteCode=TN01&customerCode=GC01T1100002`;

    getApiData(url, 'get', {})
      .then((result) => {
        if (result?.success == 1) {
          sethStoreData(result);
          setserviceList(result?.service);
          // setproductList(result?.product);
          // setfilterArr(result?.product);
          var allList=[];
          for (let i = 0; i < result?.product.length; i++) {
            for (let j = 0; j < result?.product[i].items.length; j++) {
              if(sid == 2){
                if(result?.product[i].items[j].isBestSelling){
                  allList.push(result?.product[i].items[j]);
                }
              }else if(sid == 3){
                if(result?.product[i].items[j].isNewArrived){
                  allList.push(result?.product[i].items[j]);
                }
              }else{
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

  const renderServiceBtn = ({ item, index }) => {
    return (
      <View
        style={{
          width: '25%',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <CircularButton
          iconResource={item.image}
          title={item?.departmentName}
          onPress={() =>
            navigation.navigate('RangeScreen', { serviceData: item })
          }
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
    const interval = setInterval(() => {
      let index = curIndex;
      bannerListRef.current.scrollToIndex({
        index: index == imageArr.length - 1 ? 0 : index + 1,
        // index: ++index,
        animated: true,
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [curIndex]);

  return (
    <View style={{ backgroundColor: BaseColor.darkGrey, flex: 1 }}>
      <View style={styles.headerCont}>
        <Image
          style={{ height: 48, width: 40 }}
          source={Images.logoResized}
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
              placeholder={t('searchServices')}
              style={{
                
                marginStart: 12,
                marginEnd: 8,
                color: BaseColor.yellow,
                fontSize: 14,
              }}
              value={searchTxt}
              placeholderTextColor={BaseColor.amber}
              onChangeText={setsearchTxt}
              onChange={() => {
                const tempArr = productList.filter((item) => {
                  const name =
                    item && item?.itemName
                      ? item?.itemName.toLowerCase()
                      : '';
                  return name.includes(searchTxt.toLowerCase());
                });

                setfilterArr(tempArr);
              }}
              resizeMode="center"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={Icons.notification}
              style={{
                
                marginHorizontal: 8,
                marginEnd: 8,
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dispatch(logout())}>
            <Image
              source={Icons.exit}
              style={{
                
                height: 20,
                width: 20,
                marginHorizontal: 8,
                marginStart: 8,
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 8,
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                    <Image source={item.image} style={styles.scrollImg} />
                  </View>
                </View>
              );
            }}
            data={imageArr}
            pagingEnabled
          />
        </View>

          <View style={styles.dotConSty}>
            {imageArr.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.dotSty,
                    {
                      backgroundColor:
                        curIndex === index
                          ? BaseColor.amber
                          : BaseColor.darkAmber,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        <View style={{ padding: 12 }}>
          <View style={styles.contHeader}>
            <CText value={t('services')} size={20} color={BaseColor.amberTxt} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Booking')}>
              <CText
                value={t('viewAll')}
                size={14}
                color={BaseColor.darkAmber}
              />
            </TouchableOpacity>
          </View>
            <View>
              <FlatList
              
                numColumns={4}
                data={serviceList}
                renderItem={renderServiceBtn}
                // contentContainerStyle={{
                //   width: '100%',
                // }}
                keyExtractor={(item, index) => index}
              />
            </View>
        </View>

        <View style={{ padding: 12 }}>
          <View style={styles.contHeader}>
            <CText value="Shop" size={20} color={BaseColor.amberTxt} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Shopping')}>
              <CText
                value={t('viewAll')}
                size={14}
                color={BaseColor.darkAmber}
              />
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
                            ? BaseColor.amberTxt
                            : '#434343',
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
                        item.id === selectedTab.id ? BaseColor.amberTxt : '#434343'
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
      </View>
      <Loader loader={loader} />
    </View>
  );
}
