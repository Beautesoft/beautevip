import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CHeader from '../../components/CHeader';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import CText from '../../components/CText';
import { styledFunc } from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import CButton from '../../components/CButton';
import { getApiData } from '../../config/apiHelper';
import BaseSetting, { baseUrl } from '../../config/settings';
import CLoader from '../../components/CLoader';
import { t } from 'i18next';
import AuthAction from '../../redux/reducer/auth/actions';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import { changeTheme } from '../../redux/reducer/theme/themeAction';
import RNRestart from 'react-native-restart';

import Resizer from 'react-image-file-resizer';
import { Linking } from 'react-native';

export default function Settings({ navigation }) {
  const currentTheme = useSelector((state) => state.theme.theme);

  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();
  const { updateUserData } = AuthAction;
  const { logout, setUserData, setStoreData } = AuthAction;
  const dispatch = useDispatch();

  const [address, setaddress] = useState();

  const [showModal, setshowModal] = useState(false);
  const [profileData, setprofileData] = useState();

  const [loader, setloader] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const { clientDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    GetAddress();
    setState(listArr);
    getEarnedPoints();
  }, [isFocused]);

  function getEarnedPoints() {
    const url = `/getCustomerPointsNew?customerCode=${userData.customerCode}`;

    fetch(`${BaseSetting.api}${url}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(
          '🚀 ~ file: myearnpoint.js ~ line 28 ~ .then ~ result',
          result,
        );
        if (result?.success == 1) {
          setTotalPoints(result.totalPoints);
          //listArr[10].value = result.totalPoints;  // To be remove this commented code because total points are setting 
          //setState([...listArr]);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: myearnpoint.js ~ line 45 ~ .then ~ err', err);
      });
  }

  const GetAddress = () => {
    //setloader(true);

    const url = `${baseUrl}api/myAddress?phoneNumber=${userData?.customerPhone}&customerCode=${userData?.customerCode}&addressType=Shipping&siteCode=${userData?.siteCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // json?.result?.map((item) => {
        //   if (item?.isDefaultAddress == true) {
        //     setaddress(item);
        //   }
        // });
        console.log("addressjson", json);
        try {
          setaddress(json?.result?.[0] !== null && json?.result?.[0] !== undefined ? json.result[0] : "");
        } catch (error) { }
        try {
          userData.customerAddress = json?.result?.[0].address !== null && json?.result?.[0].address !== undefined ? json.result[0].address : "";
          dispatch(updateUserData(userData));
          listArr[2].value = json?.result?.[0].address !== null && json?.result?.[0].address !== undefined ? json.result[0].address : "";
          setState(listArr);
        } catch (error) { }

        //setloader(false);
      })
      .catch((error) => {
        //setloader(false);
        console.error(error);
      });
  };

  const [ppphoto, setppphoto] = useState({
    uri: userData?.profilePic ? userData?.profilePic : userData?.clientLogo,
  });

  let cUserData = {
    photo: ppphoto,
    name: userData?.customerName,
    address: address ? address.address : userData?.customerAddress === "" ? "" : userData?.customerAddress,
    email: userData?.email,
    phone: userData?.customerPhone,
  };

  const listArr = [
    /*{
      title: 'My Services',
      onPress: () => {
        navigation.navigate('MyPackages');
      },
    },
    {
      title: 'My Products',
      onPress: () => {
        navigation.navigate('MyProducts');
      },
    },
    {
      title: 'My Invoices',
      onPress: () => {
        navigation.navigate('MyOrder');
      },
    },*/
    {
      title: t('profilePhoto'),
      //{uri: (userData?.profilePic && userData?.profilePic != 33) ? userData?.profilePic : userData?.clientLogo}
      photoData: cUserData.photo,
      // {
      //   uri: pPic ? pPic : profileData?.uri,
      // }
      onPress: () => {
        setshowModal(true);
      },
    },
    {
      title: t('userName'),
      value: cUserData.name,
      onPress: () => {
        navigation.navigate('ChangeUserName');
      },
    },
    {
      title: t('address'),
      value: `${userData?.customerAddress === "" || userData?.customerAddress === null ? "" : userData?.customerAddress}`,
      onPress: () => {
        navigation.navigate('ChangeAddress');
      },
    },
    {
      title: t('email'),
      value: cUserData.email,
      onPress: () => {
        navigation.navigate('ChangeEmail');
      },
    },
    /* {
       title: t('myPoints'),
       value: totalPoints,
       onPress: () => {
         navigation.navigate('MyEarnPoint');
       },
     },*/
    /* {
       title: t('loginPassword'),
       value: '*********',
       onPress: () => {
         navigation.navigate('ChangePassword');
       },
     },*/
    /* 
    {
      title: t('phoneNumber'),
      value: cUserData.phone,
      onPress: () => {
        navigation.navigate('ChangeNumberOtp');
      },
    },
    // {
    //   title: 'Health Declaration',
    //   onPress: () => {},
    // },
   {
      title: t('feedback'),
      onPress: () => {
        navigation.navigate('Feedback');
      },
    },
    {
      title: t('aboutUs'),
      onPress: () => {
        Linking.openURL('https://pages.flycricket.io/beautesoft-vip/');
      },
    },
    {
      title: 'Change Theme',
      onPress: () => {
        handleChangeTheme();
      },
      value: currentTheme !== 'Dark' ? 'Light' : 'Dark',
    },*/
    // {
    //   title: t('languageSetting'),
    //   onPress: () => {
    //     navigation.navigate('Language');
    //   },
    // },
    /*{
      title: t('deleteAccount'),
      onPress: () => {
        Alert.alert(
          'Delete Account?',
          'Are you sure you want to delete?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteUser() },
          ],
          { cancelable: false },
        );
      },
    },
    {
      title: 'Version',
      value: '04.11.2023',
      onPress: () => {
        //navigation.navigate('Language');
      },
    },*/
  ];
  if (clientDetails?.isEnableMyServices === "Yes") {
    listArr.push({
      title: 'My Services',
      onPress: () => {
        navigation.navigate('MyPackages');
      },
    });
  }
  if (clientDetails?.isEnableMyProducts === "Yes") {
    listArr.push({
      title: 'My Products',
      onPress: () => {
        navigation.navigate('MyProducts');
      },
    });
  }
  if (clientDetails?.isEnableMyInvoices === "Yes") {
    listArr.push({
      title: 'My Invoices',
      onPress: () => {
        navigation.navigate('MyOrder');
      },
    });
  }
  if (clientDetails?.isEnableMyPoints === "Yes") {
    listArr.push({
      title: t('myPoints'),
      value: totalPoints,
      onPress: () => {
        navigation.navigate('MyEarnPoint');
      },
    });
  }
  listArr.push({
    title: t('loginPassword'),
    value: '*********',
    onPress: () => {
      navigation.navigate('ChangePassword');
    },
  });
  
  listArr.push({
    title: t('deleteAccount'),
    onPress: () => {
      Alert.alert(
        'Delete Account?',
        'Are you sure you want to delete?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => deleteUser() },
        ],
        { cancelable: false },
      );
    },
  });
  listArr.push({
    title: 'Version',
    value: '24.MAR.2024',
    onPress: () => {
      //navigation.navigate('Language');
    },
  });
  const handleChangeTheme = () => {
    dispatch(changeTheme(currentTheme === 'Dark' ? 'Light' : 'Dark'));
    setTimeout(() => {
      RNRestart.Restart();
    }, 100);
  };
  const deleteUser = () => {
    let url = BaseSetting.api + BaseSetting.endpoints.deleteUser;
    const data = {
      customerCode: userData?.customerCode,
    };
    getApiData(BaseSetting.endpoints.deleteUser, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 199 ~ .then ~ err', result);
        if (result?.success == 1) {
          dispatch(logout());
        }
        Toast.show(result?.error);
        //setloader(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 199 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
        //setloader(false);
      });
  };

  const [state, setState] = useState([]);

  const renderList = ({ item, index }) => {
    return (
      <>
        {index > 0 && <View style={styles.divider} />}
        <TouchableOpacity
          style={styles.listCont}
          activeOpacity={0.7}
          onPress={item?.onPress}>
          <Text style={styles.listTitle}>{item?.title}</Text>
          {item.title === t('myPoints') ? (
            <Text style={[styles.listValue, {}]}>{totalPoints}</Text>
          ) : item?.photoData ? (
            <Image
              source={
                item?.photoData
                  ? item?.photoData
                  : { uri: userData?.clientLogo }
              }
              style={{ height: 34, width: 34, borderRadius: 80 }}
            />
          ) : item?.value ? (
            <Text style={[styles.listValue, {}]}>{item?.value}</Text>
          ) : (
            <Image
              source={Icons.right_arrow}
              style={{ height: 24, width: 16 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
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

  const onChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(async (image) => {
      console.log(
        '🚀 ~ file: index.js ~ line 166 ~ onChoosePhoto ~ image',
        image,
      );
      const tempObj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.path.substring(image?.path.lastIndexOf('/') + 1),
      };
      setshowModal(false);
      setprofileData(tempObj);
      changeProfile(tempObj);
      console.log(image);

      //resize image
      // try {
      //   const image = await resizeFile(image);
      //   console.log("🚀 ~Resized",image);
      // } catch (err) {
      //   console.log(err);
      // }
    });
  };

  const onClickCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setshowModal(false);
      const tempObj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.path.substring(image?.path.lastIndexOf('/') + 1),
      };
      setprofileData(tempObj);
      changeProfile(tempObj);
      console.log(image);
    });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      let quality = 100;
      //4MB image file
      if (file.size > 4000000) {
        quality = 90;
      }
      //8MB image file
      if (file.size > 8000000) {
        quality = 85;
      }
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        quality,
        0,
        (uri) => {
          // resolve(uri);
          console.log('🚀 ~Uri>>', uri);
        },
        'file', //"base64",
        150,
        150,
      );
    });

  const changeProfile = (profileData) => {
    console.log('PPP:>>>', profileData);
    if (!profileData.uri) {
      return;
    }

    // const data = {
    //   profile: profileData,
    //   siteCode: '',
    //   phoneNumber: userData?.customerPhone,
    //   customerCode: userData?.customerCode,
    //   notificationFlag: 1,
    // };
    //setloader(true);

    const form = new FormData();
    const jsonKeyObj = {
      siteCode: '',
      phoneNumber: userData?.customerPhone,
      customerCode: userData?.customerCode,
      notificationFlag: 1,
    };

    // form.append('file', profileData);
    // form.append('jsonKey', jsonKeyObj);
    // form.append('siteCode', '');
    // form.append('phoneNumber', userData?.customerPhone);
    // form.append('customerCode', userData?.customerCode);
    // form.append('notificationFlag', '1');
    let body = new FormData();
    body.append('profile', {
      uri: profileData.uri,
      name: profileData.name,
      filename: profileData.name,
      type: profileData.type,
    });
    body.append('Content-Type', profileData.type);
    // body.append('jsonKey', jsonKeyObj);
    body.append('siteCode', '');
    body.append('phoneNumber', userData?.customerPhone);
    body.append('customerCode', userData?.customerCode);
    body.append('notificationFlag', '1');

    // Alert.alert("FData:>",JSON.stringify(profileData)+` ,${body} `+JSON.stringify(jsonKeyObj))
    console.log(
      '🚀 ~ file: index.js ~ line 242 ~ changeProfile ~ BaseSetting.baseUrl + BaseSetting.endpoints.profilePicture',
      body,
      BaseSetting.api + BaseSetting.endpoints.profilePic,
    );
    let url = BaseSetting.api + BaseSetting.endpoints.profilePic; //'${baseUrl}api/profilePicture'  //${baseUrl}api/updateProfileF21
    fetch(`${baseUrl}api/profilePicture`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        //'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        //setloader(false);
        // Alert.alert("Success!",JSON.stringify(result))
        console.log(
          '🚀 ~ file: index.js ~ line 219 ~ changeProfile ~ result',
          result,
        );
        if (result?.success == '1') {
          // dispatch(remmoveUsrData())
          // userData.profilePic = result?.result;
          // dispatch(setUserData(result?.result));
          //userData=result?.result;
          let newPic = result?.result?.profilePic + '?' + new Date();
          setppphoto({ uri: newPic });
          // listArr[1].photoData = {uri:result?.result};
          // setState(listArr);
          //cUserData.photo={uri:result?.result?.profilePic};

          // let myListArr = [...listArr];
          // myListArr[1].photoData={uri:newPic};
          // setState(myListArr);

          userData.profilePic = newPic;
          dispatch(updateUserData(userData));
          setState((pState) => {
            console.log('🚀 before>>', pState);
            //pState[0].title="My Pac "
            pState[0].photoData = { uri: newPic + '?' + new Date() };
            console.log('🚀 after>>', pState);
            return [...pState];
          });

          console.log('VVVL>', userData);

          Alert.alert('Success!', 'Profile image uploaded successfully.');
        } else {
          Alert.alert('Failed try again!', result?.error);
        }

        if (loader) {
          setloader(false);
        }
      })
      .catch((err) => {
        //setloader(false);
        console.log(
          '🚀 ~ file: index.js ~ line 259 ~ changeProfile ~ err',
          err,
        );
        Alert.alert('Error!', 'Oops! Failed to upload profile image.');
      });
  };

  return (
    <>
      <CHeader title="My Profile" />

      <View style={styles.container}>
        <FlatList
          data={state}
          keyExtractor={(item, index) => index}
          renderItem={renderList}
          extraData={state}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <CLoader loader={loader} />
      <Modal
        style={{ flex: 1 }}
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setshowModal(!showModal)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setshowModal(false)}
          style={{
            flex: 1,
            backgroundColor: theme().white40,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme().black,
              width: '100%',
              padding: 12,
            }}>
            <CButton
              title={t('clickCamera')}
              style={{
                width: '100%',
                marginVertical: 8,
              }}
              onPress={onClickCamera}
            />
            <CButton
              title={t('chooseGallery')}
              style={{
                width: '100%',
                marginVertical: 8,
              }}
              onPress={onChoosePhoto}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
