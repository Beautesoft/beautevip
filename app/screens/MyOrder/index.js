import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { styledFunc } from './styles';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import Loader from '../../components/Loader';
const MyOrder = ({ navigation }) => {
  const styles = styledFunc();
  const [loader, setloader] = useState(false);

  const renderOrders = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Invoice')}
        activeOpacity={0.8}
        style={styles.productContainer}>
        <View style={styles.itemContainer}>
          <CText
            value={'Service : '}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
          <CText
            value={'Essential Oil Massage'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={styles.itemContainer}>
          <CText
            value={'Date/Time : '}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
          <CText
            value={'20 Nov 2022 04:30-05:30'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={styles.itemContainer}>
          <CText
            value={'Location : '}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
          <CText
            value={'Gracious Pvt Ltd'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={styles.itemContainer}>
          <CText
            value={'208 new upper changi road #01-659'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={styles.itemContainer}>
          <CText
            value={'Staff : '}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
          <CText
            value={'Ivy'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={styles.itemContainer}>
          <CText
            value={'Status : '}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
          <CText
            value={'Done'}
            size={14}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CHeader
        title={'My Order'}
        showLeftIcon
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <CText
            value={'Shan'}
            size={18}
            color={'#B1B1B1'}
            style={styles.text}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            keyExtractor={(item, index) => index}
            renderItem={renderOrders}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <View style={styles.noOrder}>
                <Text>No Orders</Text>
              </View>
            )}
          />
        </View>
        <Loader loader={loader} />
      </View>
    </>
  );
};
export default MyOrder;
