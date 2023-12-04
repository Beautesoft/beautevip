import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import { theme } from '../../redux/reducer/theme';
import { Icons } from '../../config/icons';
import { FontFamily } from '../../config/typography';
import { styledFunc } from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment';
import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';
import Toast from 'react-native-simple-toast';
import { t } from 'i18next';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import OrderDataTableComponent from './OrderDataTableComponent';
import RescheduleComponent from './RescheduleComponent';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

export default function OrderDetails({ navigation, route }) {
  const styles = styledFunc();
  const orderData = route?.params?.orderData;
  const oid = route?.params?.oid;
  const tData = route?.params?.tData;
  const [rateService, setrateService] = useState(false);
  const [Openreschedule, SetOpenreschedule] = useState(false);
  console.log("OrderDetails", orderData);
  const state = {
    HeadTable: [
      'code',
      'name',
      'qty',
      'unit price',
      'promo price',
      'item amount',
    ],
    DataTable: tData,
  };
  const modalHeight = Dimensions.get('window').height * 0.9; // Set modal height to 50% of the screen height
  const closeModal = () => {
    SetOpenreschedule(false);
    // You can perform additional actions on modal close if needed
  };
  const refreshComponent = () => {
    // Call forceUpdate to trigger a re-render
    this.forceUpdate();
  };


  const RescheduleAppointmentConfirmationAlert = () =>
    Alert.alert(
      'Reschedule Appointment !',
      'Are you Sure ? ',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => SetOpenreschedule(true),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );

  const showAppointmentCancelAlert = () =>
    Alert.alert(
      'Cancel Appointment !',
      'Are you Sure ? ',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => AppointmentCancel(),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  const AppointmentCancel = () => {
    const data = {
      appointmentCode: orderData?.appointmentID,
    };

    getApiData(BaseSetting?.endpoints?.appointmentCancel, 'post', data)
      .then((result) => {
        console.log('🚀 ~ file: index.js ~ line 35 ~ .then ~ result', result);
        if (result?.success == 1) {
          Toast.show(result?.result);
          navigation.navigate('BottomTabsNavigator', { screen: 'Home' });
        } else {
          Toast.show(result?.result);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 38 ~ .then ~ err', err);
        Toast.show('Something went wrong!');
      });
  };

  useEffect(() => {
    console.log('props route', route.params);
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
        title={oid == 5 ? t('history') : t('appointmentDetails')}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.topPart}>
            <View
              style={{
                borderRadius: 4,
                overflow: 'hidden',
                height: 90,
                width: 90,
              }}>
              <LinearGradient
                colors={['#806306', '#594000']}
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                style={styles.llCont}>
                <Image
                  source={Icons.mail}
                  style={{ height: '60%', width: '60%' }}
                  resizeMode="contain"
                  tintColor={theme().black}
                />
              </LinearGradient>
            </View>
            <View style={{ paddingStart: 8, flex: 1 }}>
              <CText
                value={oid == 6 ? orderData?.customerName : orderData?.subject}
                color={theme().amberTxt}
                size={24}
                fontFamily={FontFamily.Poppins_SemiBold}
              />
              <CText
                value={oid == 6 ? '' : orderData?.duration + ' min'}
                color={theme().amberTxt}
                size={20}
                fontFamily={FontFamily.Poppins_SemiBold}
              />
            </View>
          </View>
          <OrderDataTableComponent oid={oid} orderData={orderData} t={t} theme={theme} />


          {oid == 6 ? (
            <View style={styles.tcontainer}>
              <CText
                value={'Items detail:'}
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 2 }}
              />
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor: theme().amberTxt,
                }}>
                <Row
                  data={state.HeadTable}
                  style={styles.tHeadStyle}
                  textStyle={styles.tTableText}
                />
                <Rows data={state.DataTable} textStyle={styles.tTableText} />
              </Table>
            </View>
          ) : (
            <CText title={''} />
          )}

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Invoice');
            }}>
            <CText
              value={'Invoice'}
              size={16}
              color={theme().amberTxt}
              style={{ marginTop: 8 }}
            />
          </TouchableOpacity> */}
        </ScrollView>

        {orderData?.status === 'Completed' ? (
          <>
            <CButton
              title={t('rateService')}
              onPress={() => setrateService(!rateService)}
            />
            <CButton title={t('bookAgain')} style={{ marginTop: 16 }} />
          </>
        ) : (
          <>
            {oid == 5 || orderData?.apptStatus == 'Cancelled' ? (
              <CText
                value={''}
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 8 }}
              />
            ) : (
              <>

                <View>
                  <CButton
                    title={'Reschedule Appointment'}
                    onPress={() => RescheduleAppointmentConfirmationAlert()}
                    style={{ marginBottom: 10 }} // Add margin bottom for spacing
                  />
                  <CButton
                    title={'Cancel Appointment'}
                    onPress={() => showAppointmentCancelAlert()}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
      <Modal
        transparent
        animationType="slide"
        visible={rateService}
        style={{ flex: 1 }}
        onRequestClose={() => setrateService(!rateService)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setrateService(!rateService)}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme().darkGrey,
              width: '100%',
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FontFamily.Poppins_Regular,
                color: '#b1b1b1',
                textAlign: 'center',
              }}>
              {t('areYouSatisfy')}
            </Text>

            <Rating
              ratingCount={5}
              imageSize={60}
              style={{
                marginBottom: 24,
                justifyContent: 'space-between',
              }}
              tintColor={theme().darkGrey}
              imageSize={50}
              starContainerStyle={{ marginHorizontal: 8 }}
            />
            <TextInput
              placeholder={t('typeReviewHere')}
              style={{
                backgroundColor: '#b1b1b1',
                marginBottom: 16,
                borderRadius: 12,
                textAlign: 'center',
                height: 160,
                textAlignVertical: 'top',
                fontSize: 18,
                color: theme().darkGrey,
              }}
              placeholderTextColor={theme().darkGrey}
            />
            <CButton
              title={t('rateService')}
              onPress={() => setrateService(!rateService)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        visible={false}
        onRequestClose={() => SetOpenreschedule(!Openreschedule)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => SetOpenreschedule(!Openreschedule)}
          style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: modalHeight }]}>
            <RescheduleComponent orderData={orderData} closeModal={closeModal} />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        style={{ flex: 1 }}
        transparent
        visible={Openreschedule}
        animationType="slide"
      >

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
              height: '88%',
            }}>

            <RescheduleComponent orderData={orderData} closeModal={closeModal} />


          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // This ensures that the modal content is at the bottom of the screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
