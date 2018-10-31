import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  createNetworkMiddleware,
  reducer as network,
  checkInternetConnection,
  offlineActionTypes
} from 'react-native-offline';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import github from '../modules/Github';
import { networkTransform } from './transform';

const rootReducer = combineReducers({
  github,
  network
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [networkTransform],
  blacklist: ['github']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const networkMiddleware = createNetworkMiddleware();

export default function configureStore() {
  const store = createStore(persistedReducer, undefined,
    composeWithDevTools(
      applyMiddleware(networkMiddleware, thunk),
    )
  );
  const persistor = persistStore(
    store,
    {},
    () => {
      checkInternetConnection().then(isConnected => {
        store.dispatch({
          type: offlineActionTypes.CONNECTION_CHANGE,
          payload: isConnected,
        });
      });
    });
  return { store, persistor }
}
