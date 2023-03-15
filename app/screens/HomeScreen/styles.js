import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../../redux/reducer/theme';
export const styledFunc = () => {
  return StyleSheet.create({
    headerCont: {
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      padding: 4,
      alignItems: 'flex-end',
      marginTop: '14%',
    },
    searchCont: {
      backgroundColor: theme().color_2E2100,
      borderRadius: 80,
      alignItems: 'center',
      height: 48,
      flexDirection: 'row',
      flex: 1,
      paddingStart: 16,
      marginStart: 8,
    },
    mainCont: {
      height: 150,
      width: Dimensions.get('window').width - 16,
      paddingHorizontal: 16,
    },
    scrollImgCont: {
      borderRadius: 18,
      overflow: 'hidden',
    },
    scrollImg: {
      height: '100%',
      width: '100%',
    },
    dotConSty: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    dotSty: {
      height: 10,
      width: 10,
      borderRadius: 60,
      marginHorizontal: 4,
    },
    contHeadTxt: {},
    contHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
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