import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, FlatList } from 'react-native';

import { vw, vh } from '../../config/dimension';
import CHeader from '../../components/CHeader';
import { styledFunc } from './styles';
import { t } from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../config/icons';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';
import CText from '../../components/CText';
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment';
const Invoice = (props) => {
  const styles = styledFunc();
  const [tableHead, setTableHead] = useState([
    'No.',
    'Description',
    'Qty',
    'Amount',
  ]);
  const [tableData, setTableData] = useState();
  const orderData = props.route.params?.data;
  const initialValue = 0;
  useEffect(() => {
    let orderItem = props.route.params?.data.items;
    let tempData = [];
    const totalQuantity = orderItem.reduce(
      (accumulator, currentValue) => accumulator + currentValue.itemQty,
      initialValue,
    );
    orderItem.map((item, index) => {
      tempData.push([
        index + 1,
        `${item.itemName}`,
        item.itemQty,
        item.unitPrice.toFixed(2),
      ]);
      if (index === orderItem.length - 1) {
        tempData.push([
          '',
          '',
          totalQuantity,
          // orderItem.length,
          orderData.depositAmount.toFixed(2),
        ]);
      }
    });
    setTableData([...tempData]);
  }, []);

  return (
    <>
      <CHeader
        title={'Invoice'}
        showLeftIcon
        onLeftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        {/* <View style={styles.topPart}>
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
              value={'Sample data'}
              color={theme().amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            <CText
              value={'Sample sub data'}
              color={theme().amberTxt}
              size={18}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            <CText
              value={'Sample sub data data'}
              color={theme().white}
              size={14}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
          </View>
        </View>
        <View style={styles.divider} /> */}
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Trans :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={orderData.invoiceNo}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Issued to:'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={orderData.customerName}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Date :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={moment(orderData.transactionDate).format('DD-MMM-YYYY')}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Time :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={moment(orderData.transactionDate).format('hh:mm:ss A')}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View
          style={{
            marginTop: vh(20),
          }}
        />
        <Table
          borderStyle={{
            borderWidth: 1,
            borderColor: theme().white,
          }}>
          <Row
            flexArr={[1, 3, 1, 2]}
            data={tableHead}
            style={styles.head}
            textStyle={styles.tableText}
          />
          <Rows
            flexArr={[1, 3, 1, 2]}
            data={tableData}
            textStyle={styles.tableText}
          />
        </Table>
        {/* <View style={styles.divider} /> */}
        <View style={[styles.dateTimeContainer, { marginTop: vh(20) }]}>
          <CText
            value={'Type :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={orderData?.paymentMode}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        {/* <View style={styles.dateTimeContainer}>
          <CText
            value={'Sub Total :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={`$ ${orderData.depositAmount.toFixed(2)}`}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'GST :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <CText
              value={`$ ${(orderData.depositAmount * 0.07).toFixed(2)}`}
              color={theme().white}
              size={14}
              fontFamily={FontFamily.Poppins_Medium}
            />
            <CText
              value={'(7% GST included)'}
              color={theme().white}
              size={14}
              fontFamily={FontFamily.Poppins_Medium}
            />
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Rounding :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'$ 0.00'}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View> */}
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Grand Total :'}
            color={theme().white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={`$ ${orderData.depositAmount.toFixed(2)}`}
            color={theme().white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={{ margin: 50 }} />
      </ScrollView>
    </>
  );
};

export default Invoice;
