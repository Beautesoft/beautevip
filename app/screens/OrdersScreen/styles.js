import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColor.darkGrey,
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
    borderColor: BaseColor.amberTxt,
    paddingHorizontal: 16,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 8,
  },
});
