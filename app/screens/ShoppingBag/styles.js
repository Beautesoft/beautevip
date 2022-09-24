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
    padding: 16,
  },
  itemCont: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  dropValue: {
    color: BaseColor.amberTxt,
    fontFamily: FontFamily.Poppins_SemiBold,
    marginEnd: 12,
  },
  dropCont: {
    borderWidth: 1,
    borderColor: BaseColor.amberTxt,
    borderRadius: 4,
    marginTop:4,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
