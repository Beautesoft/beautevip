import { reduce } from 'lodash';
import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    badge: {
      borderRadius: 9,
      minHeight: 18,
      minWidth: 0,
      position: 'absolute',
      right: -10,
      top: -10,
      paddingStart: 4,
      paddingEnd: 4,
      backgroundColor: theme().darkRed,
    },

    header: {
      height: 140,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
      backgroundColor: theme().amber,
      padding: 16,
      paddingBottom: 32,
    },
    searchCont: {
      backgroundColor: '#2E2100',
      borderRadius: 80,
      alignItems: 'center',
      height: 48,
      flexDirection: 'row',
      flex: 1,
      paddingStart: 16,
      marginStart: 16,
      marginEnd: 16,
    },
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -16,
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      paddingTop: 16,
      padding: 16,
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
  });
};