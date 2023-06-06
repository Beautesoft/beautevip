const actions = {
  GET_CLIENT_DETAILS: 'auth/GET_CLIENT_DETAILS',
  SET_USERDATA: 'auth/SET_USERDATA',
  UPDATE_USERDATA: 'auth/UPDATE_USERDATA',
  ADD_BOOKING_DATA: 'auth/ADD_BOOKING_DATA',
  SET_SIGNUPDATA: 'auth/SET_SIGNUPDATA',
  SET_STOREDATA: 'auth/SET_STOREDATA',
  SET_LANGUAGE: 'auth/SET_LANGUAGE',
  LOGOUT: 'auth/LOGOUT',
  REMOVE_USR_DATA: 'auth/REMOVE_USR_DATA',

  getClientDetails: () => (dispatch) =>
    dispatch({
      type: actions.GET_CLIENT_DETAILS,
    }),
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
  addBookingData: (bookingData) => (dispatch) =>
    dispatch({
      type: actions.ADD_BOOKING_DATA,
      bookingData,
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
};

export default actions;
