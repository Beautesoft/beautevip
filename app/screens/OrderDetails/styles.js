import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -16,
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      paddingTop: 24,
      padding: 24,
    },
    tabCont: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme().amberTxt,
      paddingHorizontal: 16,
      paddingVertical: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: 8,
    },
    topPart: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    llCont: {
      height: '100%',
      width: '100%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lines: {
      height: 1,
      backgroundColor: '#b1b1b1',
      borderRadius: 8,
      flex: 1,
    },
    rowStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    tcontainer: {
      width: '100%',
      flex: 1,
      padding: 0,
      backgroundColor: theme().darkGrey,
    },
    tHeadStyle: {
      width: '100%',
      alignContent: 'center',
      backgroundColor: '#ffffff',
    },
    tTableText: {
      padding: 2,
      margin: 4,
      color: theme().amberTxt,
    },
  });
};
