import {Platform} from 'react-native';

export const FontFamily = {
  Poppins_Black: Platform.OS === 'android' ? 'Poppins-Black' : 'System',
  Poppins_SemiBold: Platform.OS === 'android' ? 'Poppins-SemiBold' : 'System',
  Poppins_Bold: Platform.OS === 'android' ? 'Poppins-Bold' : 'System',
  Poppins_Regular: Platform.OS === 'android' ? 'Poppins-Regular' : 'System',
  Poppins_Medium: Platform.OS === 'android' ? 'Poppins-Medium' : 'System',
};
