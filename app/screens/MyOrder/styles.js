import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';

export const styledFunc = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme().darkGrey,
      paddingBottom: 40,
    },
    nameContainer: {
      paddingVertical: 10,
    },
    productContainer: {
      padding: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme().white,
      borderRadius: 10,
      marginTop: 10,
    },
    itemContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: 20,
      borderColor: theme().white,
    },
    text: {
      fontWeight: 'bold',
    },
    noOrder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    orderImage: {
      width: 90,
      height: 90,
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      //marginStart: 10,
    },
    dot: {
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: theme().white,
      marginEnd: 5,
      marginTop: 6,
    },
  });
};
