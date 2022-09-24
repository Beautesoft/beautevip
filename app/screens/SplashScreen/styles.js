import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    color: BaseColor.yellow,
  },
  btnStyle: {
    width: '90%',
    marginBottom: 16,
    marginTop: 16,
  },
});
