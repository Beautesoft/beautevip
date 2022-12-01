import type from '../themeAction/types';
import { themeOptions } from '../index';
const colorOptions = Object.keys(themeOptions);
let Dark = colorOptions.Dark;
console.log('colorOptions', colorOptions);

const initialState = {
  theme: Dark,
};
export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.CHANGE_APP_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};
