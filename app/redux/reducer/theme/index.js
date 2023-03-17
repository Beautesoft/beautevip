import { BaseColor, LightTheme } from '../../../config/colors';
import { store } from '../../store/configureStore';

export const themeOptions = {
  Light: LightTheme,
  Dark: BaseColor,
};
export const theme = () => {
  let returnTheme;
  const colorOptions = Object.keys(themeOptions);
  const themeType = store.getState().theme.theme || 'Light';
  //const themeType = 'Light';

  colorOptions.map((item, index) => {
    if (themeType === item) {
      returnTheme = item;
    }
  });

  return themeOptions[returnTheme];
};
