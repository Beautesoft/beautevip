import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment';

const OrderDataTableComponent = ({ oid, orderData, t, theme }) => {
  const tableHead = ['Label', 'Value'];
  const tableData = [
    [t('dnt'), moment(oid == 6 ? orderData?.transactionDate : orderData?.startTime).format('DD-MM-YYYY LT')],
    [oid == 6 ? 'Amount' : t('location'), oid == 6 ? '$' + orderData?.depositAmount : orderData?.location],
    [oid == 6 ? 'Staff' : t('beautician'), orderData?.staffName || orderData?.employeeName],
    [oid == 6 ? 'Transaction No.' : 'Id', oid == 6 ? orderData?.transactionNo : orderData?.appointmentID],
  ];

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: theme().borderColor }}>
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={[styles.row, index % 2 && { backgroundColor: theme().rowColor }]}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
});

export default OrderDataTableComponent;
