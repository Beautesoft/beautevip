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
      padding: 16,
    },
    textInput: {
      borderWidth: 1,
      borderColor: theme().darkAmber,
      borderRadius: 4,
      textAlign: 'center',
      fontFamily: FontFamily.Poppins_Regular,
      fontSize: 14,
      color: theme().amber,
      marginTop: 16,
      flex: 1,
      marginStart: 4,
    },
    dropValue: {
      color: theme().darkAmber,
      fontFamily: FontFamily.Poppins_SemiBold,
      marginEnd: 12,
      fontSize: 20,
    },
    dropCont: {
      borderWidth: 1,
      borderColor: theme().darkAmber,
      borderRadius: 4,
      flexDirection: 'row',
      padding: 4,
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 48,
      marginEnd: 4,
    },
  });
};
