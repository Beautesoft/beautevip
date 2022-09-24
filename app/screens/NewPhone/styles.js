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
    paddingTop: 16,
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: BaseColor.darkAmber,
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: FontFamily.Poppins_Regular,
    fontSize: 14,
    color: BaseColor.amber,
    marginTop: 16,
    flex: 1,
    marginStart: 4,
  },
  dropValue: {
    color: BaseColor.darkAmber,
    fontFamily: FontFamily.Poppins_SemiBold,
    marginEnd: 12,
    fontSize: 20,
  },
  dropCont: {
    borderWidth: 1,
    borderColor: BaseColor.darkAmber,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    marginEnd: 4,
  },
});
