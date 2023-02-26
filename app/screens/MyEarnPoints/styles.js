import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -16,
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      // paddingTop: 16,
    },
    totalPointsContainer: {
      paddingVertical: 15,
      backgroundColor: 'rgb(61,57,55)',
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    totalPointText: {
      fontSize: 20,
      fontFamily: FontFamily.Poppins_Bold,
      color: theme().color_fffaf0,
      alignSelf: 'center',
    },
    pointContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pointsButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: 'rgb(48,41,28)',
    },
    pointsButtonTitle: {
      fontSize: 16,
      fontFamily: FontFamily.Poppins_Bold,
      color: theme().white,
    },
    pointsText: {
      fontSize: 16,
      fontFamily: FontFamily.Poppins_Medium,
      color: theme().white,
    },
    rewardAndRedeemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgb(61,57,55)',
    },
    rewardText: {
      fontSize: 16,
      fontFamily: FontFamily.Poppins_Medium,
      color: theme().white,
    },
    rewardButton: {
      width: '50%',
      paddingVertical: 15,
      paddingStart: 16,
      borderTopWidth: 1,
    },
    quantityAndMoneyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '40%',
    },
  });
};
