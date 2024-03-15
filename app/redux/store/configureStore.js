// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer/rootReducer';

// /**
//  * Redux Setting
//  */
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   stateReconciler: autoMergeLevel2,
//   // blacklist: ['filter', 'booking'],
// };

// let middleware = [thunk];
// middleware = [...middleware];

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(...middleware));
// const persistor = persistStore(store);

// export { store, persistor };

import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import rootReducer from '../reducer/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const enhancer = compose(applyMiddleware(thunk));
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const storeReducer = persistReducer(
  persistConfig,
  rootReducer,
);

const store = createStore(storeReducer, enhancer);
const persistor = persistStore(store);
export { store, persistor };
