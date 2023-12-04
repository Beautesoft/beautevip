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
      paddingTop: 16,
    },
    listCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    listTitle: {
      fontFamily: FontFamily.Poppins_Medium,
      fontSize: 16,
      color: theme().white,
    },
    listValue: {
      fontFamily: FontFamily.Poppins_Medium,
      fontSize: 16,
      color: theme().amberTxt,
      flex: 1,
      textAlign: 'right',
    },
    divider: {
      height: 1,
      marginHorizontal: 16,
      backgroundColor: theme().white40,
      marginVertical: 4,
    },
  });
};
