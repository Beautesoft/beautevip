import { StyleSheet } from 'react-native';
import { FontFamily } from '../../config/typography';
import { theme } from '../../redux/reducer/theme';
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
      marginBottom: 16,
    },
  });
};
