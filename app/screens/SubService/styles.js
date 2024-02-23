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
      paddingTop: 16,
    },
  });
};
