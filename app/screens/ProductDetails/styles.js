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
  },
  aTCCOnt: {
    flexDirection: 'row',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    backgroundColor: BaseColor.white,
    paddingHorizontal: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropValue: {
    color: BaseColor.black,
    fontFamily: FontFamily.Poppins_SemiBold,
    marginEnd: 12,
  },
  dropCont: {
    borderWidth: 1,
    borderColor: BaseColor.black,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
