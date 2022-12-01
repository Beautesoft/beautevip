import { StyleSheet } from 'react-native';
import { FontFamily } from '../../config/typography';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -24,
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      paddingTop: 16,
      paddingStart: 24,
      paddingBottom: 24,
      paddingEnd: 24,
      flexGrow: 1,
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
    btnTxt: {
      fontFamily: FontFamily.Poppins_Medium,
      fontSize: 14,
      color: theme().amber,
    },
    btnCont: {
      borderWidth: 1,
      borderColor: theme().darkAmber,
      borderRadius: 12,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      marginVertical: 8,
    },
    locCont: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      marginVertical: 8,
    },
    beautyCont: {
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      padding: 4,
    },
  });
};
