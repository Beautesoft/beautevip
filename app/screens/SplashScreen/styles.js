import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    heading: {
      color: theme().yellow,
    },
    btnStyle: {
      width: '90%',
      marginBottom: 16,
      marginTop: 16,
    },
  });
};
