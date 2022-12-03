import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme().darkGrey,
      flex: 1,
      marginTop: -16,
    },
    textInput: {
      borderWidth: 1,
      borderColor: theme().darkAmber,
      borderRadius: 4,
      textAlign: 'center',
      fontFamily: FontFamily.Poppins_Regular,
      fontSize: 14,
      color: theme().amber,
      textAlignVertical: 'top',
    },
    topPart: {
      backgroundColor: theme().white30,
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      padding: 16,
    },
    headTxt: {
      color: theme().white,
      fontFamily: FontFamily.Poppins_Bold,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
    },
    secTxt: {
      color: theme().white,
      fontFamily: FontFamily.Poppins_Regular,
      fontSize: 20,
      textAlign: 'center',
    },
    viewCont: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewTitle: {
      fontFamily: FontFamily.Poppins_Medium,
      fontSize: 18,
      color: theme().white,
      fontWeight: '700',
    },
    viewSession: {
      fontFamily: FontFamily.Poppins_Regular,
      fontSize: 18,
      color: theme().white,
    },
    bookBtn: {
      borderWidth: 1,
      borderColor: theme().amber,
      paddingHorizontal: 12,
      padding: 4,
    },
    secondView: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flex: 4,
    },
    /**New**/
    packageItemContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderWidth: 1,
      borderColor: theme().white,
      borderRadius: 10,
      marginTop: 10,
      padding: 20,
    },
    packageImage: {
      width: 90,
      height: 90,
      borderRadius: 10,
    },
  });
};
