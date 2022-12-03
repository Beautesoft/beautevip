import { StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';
import { FontFamily } from '../../config/typography';

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
      borderColor: '#fff',
      borderRadius: 10,
      marginTop: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: 20,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 10,
      marginTop: 10,
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
      width: '67%',
      marginStart: 10,
    },
  });
};
