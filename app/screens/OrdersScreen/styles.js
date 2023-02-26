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
