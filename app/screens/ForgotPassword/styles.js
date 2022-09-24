import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    marginTop: 24,
  },
  heading: {
    color: BaseColor.yellow,
  },
  btnStyle: {
    width: '90%',
    marginBottom: 16,
  },
  cInput: {
    marginTop: 12,
  },
  rowStyle: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
  },
  btnStyle: {
    width: '100%',
    flex: 1,
    margin: 8,
  },
  forgotStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 8,
  },
});
