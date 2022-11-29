const actions = {
  SET_USERDATA: 'auth/SET_USERDATA',
  UPDATE_USERDATA: 'auth/UPDATE_USERDATA',
  SET_SIGNUPDATA: 'auth/SET_SIGNUPDATA',
  SET_STOREDATA: 'auth/SET_STOREDATA',
  SET_LANGUAGE: 'auth/SET_LANGUAGE',
  LOGOUT: 'auth/LOGOUT',
  REMOVE_USR_DATA: 'auth/REMOVE_USR_DATA',
  SET_THEME: 'SET_THEME',

  remmoveUsrData: () => (dispatch) =>
    dispatch({
      type: actions.REMOVE_USR_DATA,
    }),

  setUserData: (userData) => async (dispatch) =>
    dispatch({
      type: actions.SET_USERDATA,
      data: { ...userData },
    }),

  updateUserData: (userData) => (dispatch) =>
    dispatch({
      type: actions.UPDATE_USERDATA,
      userData,
    }),

  setCurrentLanguage: (currentLanguage) => (dispatch) =>
    dispatch({
      type: actions.SET_LANGUAGE,
      currentLanguage,
    }),

  setSignupData: (signupData) => (dispatch) =>
    dispatch({
      type: actions.SET_SIGNUPDATA,
      signupData,
    }),

  setStoreData: (storeData) => {
    return {
      type: actions.SET_STOREDATA,
      storeData,
    };
  },

  // setStoreData: (storeData) => (dispatch) =>
  //   dispatch({
  //     type: actions.SET_STOREDATA,
  //     storeData,
  //   }),

  logout: () => (dispatch) =>
    dispatch({
      type: actions.LOGOUT,
    }),
  setTheme: (theme) => {
    return {
      type: actions.SET_THEME,
      theme,
    };
  },
};

export default actions;
