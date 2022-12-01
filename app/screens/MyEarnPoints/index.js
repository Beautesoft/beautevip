import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import CHeader from '../../components/CHeader';
import { styledFunc } from './styles';
import { getApiData } from '../../config/apiHelper';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import moment from 'moment';
import Loader from '../../components/Loader';
import { FontFamily } from '../../config/typography';
import BaseSetting from '../../config/settings';
import { theme } from '../../redux/reducer/theme';
const MyEarnPoint = (props) => {
  const styles = styledFunc();
  const { userData } = useSelector((state) => state.auth);
  const [rewardList, setRewardList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showRedeem, setShowRedeem] = useState(false);
  const [redeemList, setRedeemList] = useState([]);
  const [loader, setloader] = useState(false);
  const [isRefreshing, setrefreshing] = useState(false);
  useEffect(() => {
    setloader(true);
    getEarnedPoints();
  }, []);
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
          let tempRewadPointsList = result.reward;
          tempRewadPointsList.map((item) => {
            const date = item.invDate.split(' ')[0];
            const finalDate = date.split('/').reverse();
            if (finalDate[1] < 10) {
              let tempDate = `${finalDate[0]}/0${finalDate[1]}/${finalDate[2]}`;
              tempDate = moment(tempDate).format('DD MMMM YYYY');
              item.invDate = tempDate;
            } else {
              let tempDate = `${finalDate[0]}/${finalDate[1]}/${finalDate[2]}`;
              tempDate = moment(tempDate).format('DD MMMM YYYY');
              item.invDate = tempDate;
            }
          });
          setRewardList(tempRewadPointsList);
          setRedeemList(result.redeem);
          setTotalPoints(result.totalPoints);
        }
        setrefreshing(false);
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        setrefreshing(false);
        console.log('🚀 ~ file: myearnpoint.js ~ line 45 ~ .then ~ err', err);
      });
  }
  const renderPoints = ({ item, index }) => {
    return (
      <View style={styles.pointsButton}>
        <View style={{ width: '70%' }}>
          <Text style={styles.pointsText}>{item.invDate}</Text>
          <Text style={styles.pointsButtonTitle}>{item.itemName}</Text>
          <View style={styles.quantityAndMoneyContainer}>
            <Text style={styles.pointsText}>Qty: {item.qty}</Text>
            <Text style={[styles.pointsText]}>${item.invAmount}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.pointsText,
            {
              fontFamily: FontFamily.Poppins_Bold,
              color: theme().amberTxt,
            },
          ]}>
          {item.points}
        </Text>
      </View>
    );
  };
  return (
    <>
      <CHeader
        title="My Points"
        showLeftIcon
        onLeftIconPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.totalPointsContainer}>
          <Text style={styles.totalPointText}>{t('totalPoints')}</Text>
          <View style={styles.pointContainer}>
            <Text
              style={[
                styles.totalPointText,
                {
                  color: theme().amberTxt,
                },
              ]}>
              {totalPoints}
            </Text>
          </View>
        </View>
        <View style={styles.rewardAndRedeemContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowRedeem(false);
            }}
            activeOpacity={1}
            style={styles.rewardButton}>
            <Text
              style={[
                styles.rewardText,
                {
                  color: !showRedeem ? theme().amberTxt : theme().white,
                },
              ]}>
              {t('reward')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowRedeem(true);
            }}
            activeOpacity={1}
            style={[
              styles.rewardButton,
              {
                borderLeftWidth: 1,
              },
            ]}>
            <Text
              style={[
                styles.rewardText,
                {
                  color: showRedeem ? theme().amberTxt : theme().white,
                },
              ]}>
              {t('redeem')}
            </Text>
          </TouchableOpacity>
        </View>
        {showRedeem && redeemList.length > 0 && (
          <Text
            style={[
              styles.pointsText,
              { textAlign: 'right', marginHorizontal: 16 },
            ]}>
            {t('points')}
          </Text>
        )}
        {!showRedeem && rewardList.length > 0 && (
          <Text
            style={[
              styles.pointsText,
              { textAlign: 'right', marginHorizontal: 16 },
            ]}>
            {t('points')}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <FlatList
            data={showRedeem ? redeemList : rewardList}
            renderItem={renderPoints}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => {
              setrefreshing(true);
              getEarnedPoints();
            }}
            refreshing={isRefreshing}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </View>
      </View>
      <Loader loader={loader} />
    </>
  );
};

export default MyEarnPoint;
