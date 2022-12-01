import { combineReducers } from 'redux';
import auth from './auth/reducer';
import { themeReducer } from './theme/themeReducer';
const rootReducer = combineReducers({
  auth: auth,
  theme: themeReducer,
});

export default rootReducer;
