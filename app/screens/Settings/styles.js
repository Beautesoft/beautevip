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
  },
  listCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  listTitle: {
    fontFamily: FontFamily.Poppins_Medium,
    fontSize: 16,
    color: BaseColor.white,
  },
  listValue: {
    fontFamily: FontFamily.Poppins_Medium,
    fontSize: 16,
    color: BaseColor.amberTxt,
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: BaseColor.white40,
    marginVertical: 4,
  },
});
