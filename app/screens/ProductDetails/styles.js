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
    aTCCOnt: {
      flexDirection: 'row',
      borderTopEndRadius: 16,
      borderTopStartRadius: 16,
      backgroundColor: theme().white,
      paddingHorizontal: 24,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dropValue: {
      color: theme().black,
      fontFamily: FontFamily.Poppins_SemiBold,
      marginEnd: 12,
    },
    dropCont: {
      borderWidth: 1,
      borderColor: theme().black,
      borderRadius: 4,
      flexDirection: 'row',
      padding: 4,
      alignItems: 'center',
      paddingHorizontal: 16,
    },
  });
};
