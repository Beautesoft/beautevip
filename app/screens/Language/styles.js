import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColor.darkGrey,
    flex: 1,
    marginTop: -16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
    padding: 16,
  },
  addCont: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
});
