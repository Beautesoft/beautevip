import React, { useState } from 'react';
import { ScrollView, View, Text, Image, FlatList } from 'react-native';

import { vw, vh } from '../../config/dimension';
import CHeader from '../../components/CHeader';
import { styles } from './styles';
import { t } from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../config/icons';
import BaseColor from '../../config/colors';
import { FontFamily } from '../../config/typography';
import CText from '../../components/CText';
import { Table, Row, Rows } from 'react-native-table-component';
const Invoice = (props) => {
  const [tableHead, setTableHead] = useState([
    'No.',
    'Description',
    'Qty',
    'U/P',
  ]);
  const [tableData, setTableData] = useState([
    [1, 'SERVICE-Accupunture Composite Expiry\nDate : 18/12/2022', 1, '98.00'],
    [2, 'SERVICE-Accupunture Composite Expiry\nDate : 18/12/2022', 1, '98.00'],
    ['', '', 1, '98.00'],
  ]);

  return (
    <>
      <CHeader
        title={'Invoice'}
        showLeftIcon
        onLeftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.container}>
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
                tintColor={BaseColor.black}
              />
            </LinearGradient>
          </View>
          <View style={{ paddingStart: 8, flex: 1 }}>
            <CText
              value={'Sample data'}
              color={BaseColor.amberTxt}
              size={24}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            <CText
              value={'Sample sub data'}
              color={BaseColor.amberTxt}
              size={18}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
            <CText
              value={'Sample sub data data'}
              color={BaseColor.white}
              size={14}
              fontFamily={FontFamily.Poppins_SemiBold}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Trans :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'INVH983743829748'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Issued :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'Test Admin'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Date :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'18-Nov-2022'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Time :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'04:24:00 PM'}
            color={BaseColor.white}
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
            borderColor: BaseColor.white,
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
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'Cash'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Sub Total :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'98.00'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'GST :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <CText
              value={'6.41'}
              color={BaseColor.white}
              size={14}
              fontFamily={FontFamily.Poppins_Medium}
            />
            <CText
              value={'(7% GST included)'}
              color={BaseColor.white}
              size={14}
              fontFamily={FontFamily.Poppins_Medium}
            />
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Rounding :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'0.00'}
            color={BaseColor.white}
            size={14}
            fontFamily={FontFamily.Poppins_Medium}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <CText
            value={'Grand Total :'}
            color={BaseColor.white}
            size={20}
            fontFamily={FontFamily.Poppins_SemiBold}
          />
          <CText
            value={'98.00'}
            color={BaseColor.white}
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
