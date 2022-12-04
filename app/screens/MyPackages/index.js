import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import Toast from 'react-native-simple-toast';
import { styledFunc } from './styles';
import moment from 'moment';
import CButton from '../../components/CButton';
import { theme } from '../../redux/reducer/theme';
import CLoader from '../../components/CLoader';
import { t } from 'i18next';
import CText from '../../components/CText';
import { Images } from '../../config/images';

export default function MyPackages({ navigation }) {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const [packageList, setpackageList] = useState([]);
  const [availPackageList, setavailPackageList] = useState([]);

  const [loader, setloader] = useState(false);

  useEffect(() => {
    getPackage();
  }, []);

  const getPackage = () => {
    setloader(true);
    const data = {
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      siteCode: userData?.siteCode,
    };

    getApiData(BaseSetting.endpoints.mypackages, 'post', data)
      .then((result) => {
        if (result?.success == 1) {
          console.log(
            '🚀 ~ file: index.js ~ line 23 ~ .then ~ result',
            result?.result[0],
          );
          setpackageList(result?.result[0]);
          setavailPackageList(result?.result[0]?.Available);
        }

        setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 26 ~ .then ~ err', err);
        setloader(false);
        Toast.show('Something went wrong!');
      });
  };

  const renderPackages = ({ item, index }) => {
    return (
      <>
        <View
          style={[
            styles.viewCont,
            index > 0 ? { borderTopWidth: 1, borderColor: '#534105' } : null,
          ]}>
          <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image
                resizeMode="cover"
                source={Images?.logo}
                style={styles.packageImage}
              />
            </View>
            <View style={{ marginStart: 20 }}>
              <Text style={styles.viewTitle}>{item?.packageName}</Text>
              <Text style={styles.viewSession}>
                Sessions: {item?.balanceSessions}
              </Text>
              <Text style={styles.viewSession}>
                {moment(item?.packagePurchaseDate).format('DD MMM YY')}
              </Text>
            </View>
          </View>
          <View style={styles.secondView}>
            <TouchableOpacity
              style={styles.bookBtn}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('BookingScreen', {
                  itemData: item,
                  type: 'package',
                });
              }}>
              <Text style={[styles.viewSession, { color: theme().amberTxt }]}>
                {t('bookNow')}
              </Text>
            </TouchableOpacity>
            {/* <Text style={[styles.viewSession, { marginTop: 8 }]}>
              Amount: {item?.balanceAmount}
            </Text> */}
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <CHeader
        title={t('myPackages')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.topPart}>
          {packageList?.totalSessions && (
            <Text style={styles.headTxt}>
              {`${t('sessions')}: `}
              <Text
                style={styles.secTxt}>{`${packageList?.totalSessions}`}</Text>
              {/* {`  |  Amounts: `} */}
              {/* ${t('balance')} */}
              {
                // <Text
                //   style={styles.secTxt}>{`${packageList?.totalBalance}`}</Text>
              }
            </Text>
          )}
        </View>
        <FlatList
          data={availPackageList}
          keyExtractor={(item, index) => index}
          renderItem={renderPackages}
        />
      </View>
      <CLoader loader={loader} />
    </>
  );
}
