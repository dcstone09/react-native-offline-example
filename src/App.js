/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { withNetworkConnectivity } from 'react-native-offline';
import { AsyncStorage } from 'react-native';
import { purgeStoredState } from 'redux-persist';

import configureStore from './store/configureStore';
import Home from './containers/Home';

const { store, persistor } = configureStore();

const NetworkProvidedHome =  withNetworkConnectivity({
  withRedux: true,
  // pingServerUrl: '',
  checkConnectionInterval: 5000
})(Home);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <NetworkProvidedHome />
        </PersistGate>
      </Provider>
    );
  }
}


