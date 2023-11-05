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

export default function OrderDetails({ navigation, route }) {
  const styles = styledFunc();
  const orderData = route?.params?.orderData;
  const oid = route?.params?.oid;
  const tData = route?.params?.tData;
  const [rateService, setrateService] = useState(false);

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
          <View
            style={[
              styles.rowStyle,
              {
                marginTop: 32,
              },
            ]}>
            <View style={styles.lines} />
            <CText
              value={'Appointment Details'}
              size={14}
              color="#b1b1b1"
              style={{ marginHorizontal: 24 }}
            />
            <View style={styles.lines} />
          </View>
          <View style={[styles.rowStyle, { marginTop: 8 }]}>
            <View style={{}}>
              <CText
                value={t('dnt')}
                size={16}
                color="#b1b1b1"
                style={{ marginTop: 8 }}
              />
              <CText
                value={oid == 6 ? 'Amount' : t('location')}
                size={16}
                color="#b1b1b1"
                style={{ marginTop: 8 }}
              />
              <CText
                value={oid == 6 ? 'Staff' : t('beautician')}
                size={16}
                color="#b1b1b1"
                style={{ marginTop: 8 }}
              />
              <CText
                value={oid == 6 ? 'Transaction No.' : 'Id'}
                size={16}
                color="#b1b1b1"
                style={{ marginTop: 8 }}
              />
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1, marginStart: 32 }}>
              <CText
                value={moment(
                  oid == 6 ? orderData?.transactionDate : orderData?.startTime,
                ).format('DD-MM-YYYY LT')}
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 8 }}
              />
              <CText
                value={
                  oid == 6
                    ? '$' + orderData?.depositAmount
                    : orderData?.location
                }
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 8, textAlign: 'right' }}
              />
              <CText
                value={
                  oid == 6 ? orderData?.staffName : orderData?.employeeName
                }
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 8 }}
              />
              <CText
                value={
                  oid == 6 ? orderData?.transactionNo : orderData?.appointmentID
                }
                size={16}
                color={theme().amberTxt}
                style={{ marginTop: 8 }}
              />
            </View>
          </View>

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
              <CButton
                title={t('cancelAppointment')}
                onPress={() => showAppointmentCancelAlert()}
              />
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
              imageSize={42}
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
    </>
  );
}
