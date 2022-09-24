import { StyleSheet } from 'react-native';
import BaseColor from '../../config/colors';
import { FontFamily } from '../../config/typography';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColor.darkGrey,
    flex: 1,
    marginTop: -16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: BaseColor.darkAmber,
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: FontFamily.Poppins_Regular,
    fontSize: 14,
    color: BaseColor.amber,
    textAlignVertical: 'top',
  },
  topPart: {
    backgroundColor: BaseColor.white30,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    padding: 16,
  },
  headTxt: {
    color: BaseColor.white,
    fontFamily: FontFamily.Poppins_Bold,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  secTxt: {
    color: BaseColor.white,
    fontFamily: FontFamily.Poppins_Regular,
    fontSize: 20,
    textAlign: 'center',
  },
  viewCont: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTitle: {
    fontFamily: FontFamily.Poppins_Medium,
    fontSize: 18,
    color: BaseColor.white,
    fontWeight: '700',
  },
  viewSession: {
    fontFamily: FontFamily.Poppins_Regular,
    fontSize: 18,
    color: BaseColor.white,
  },
  bookBtn: {
    borderWidth: 1,
    borderColor: BaseColor.amber,
    paddingHorizontal: 12,
    padding: 4,
  },
  secondView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 4,
  },
});
