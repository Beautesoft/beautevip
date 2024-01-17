import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'flex-end',
      padding: 16,
      marginTop: 24,
    },
    heading: {
      color: theme().yellow,
    },
    btnStyle: {
      width: '90%',
      marginBottom: 16,
    },
    cInput: {
      marginTop: 12,
    },
    rowStyle: {
      flexDirection: 'row',
      marginBottom: 16,
      marginTop: 16,
    },
    btnStyle: {
      width: '100%',
      flex: 1,
      margin: 8,
    },
    dropDownStyle: {
      width: '100%',
      flex: 1,
      margin: 8,
      backgroundColor: theme().transparent,
    },
    dropdown1BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    forgotStyle: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingVertical: 8,
    },
  });
};
