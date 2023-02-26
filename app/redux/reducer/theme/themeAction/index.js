import type from './types';

export const changeTheme = (theme) => {
  return async (dispatch) => {
    dispatch({
      type: type.CHANGE_APP_THEME,
      theme: theme,
    });
  };
};
