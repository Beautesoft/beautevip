import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColor.darkGrey,
    flex: 1,
    marginTop: -16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingTop: 16,
  },
  notCont: {flexDirection: 'row', padding: 16},
});
