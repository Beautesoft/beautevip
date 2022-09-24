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
    alignItems: 'center',
  },
  scrollCont: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  proPhoto: {
    borderRadius: 60,
    height: '100%',
    width: '100%',
  },
  proCont: {
    height: 100,
    width: 100,
    borderRadius: 80,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 32,
  },
  editTxt: {
    color: BaseColor.black,
  },
  editCont: {
    backgroundColor: BaseColor.white,
    padding: 4,
    borderRadius: 80,
    paddingHorizontal: 12,
  },
  btnStyle: {
    backgroundColor: BaseColor.amber,
    borderRadius: 40,
    padding: 16,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyleTxt: {
    fontSize: 14,
    fontFamily: FontFamily.Poppins_Regular,
    color: BaseColor.darkGrey,
    marginStart: 16,
  },
  shareCont: {
    backgroundColor: BaseColor.transparent,
    borderWidth: 1,
    borderColor: BaseColor.amberTxt,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    width: '80%',
    marginTop: 24,
    borderStyle: 'dotted',
  },
  shareTxt: {
    color: BaseColor.amberTxt,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginEnd: 32,
  },
});
