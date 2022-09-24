/* eslint-disable no-console */
import types from './actions';

const initialState = {
  userData: {},
  signupData: {},
  storeData: {},
  currentLanguage: 'en',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERDATA:
      return {
        ...state,
        userData: action.userData,
      };
      
      case types.UPDATE_USERDATA:
        return {
          ...state,
          userData: action.userData,
        };

    case types.SET_SIGNUPDATA:
      return {
        ...state,
        signupData: action.signupData,
      };
    case types.SET_STOREDATA:
      return {
        ...state,
        storeData: action.storeData,
      };
    case types.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.currentLanguage,
      };

    case types.LOGOUT:
      return {
        signupData: {},
        userData: {},
        storeData: {},
      };

      case types.REMOVE_USR_DATA:
      return {
        userData: {},
      };

    default:
      return state;
  }
}
