import type from '../themeAction/types';
import { themeOptions } from '../index';
const colorOptions = Object.keys(themeOptions);
console.log('colorOptions', colorOptions);

const initialState = {
  theme: colorOptions[0],
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
