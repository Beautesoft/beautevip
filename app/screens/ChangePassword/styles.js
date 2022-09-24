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
  textInput: {
    borderWidth: 1,
    borderColor: BaseColor.darkAmber,
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: FontFamily.Poppins_Regular,
    fontSize: 14,
    color: BaseColor.amber,
    marginBottom: 16,
  },
});
