/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';

import { NativeBaseProvider } from 'native-base';

import Router from './router';

import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} 
                   persistor={persistor}>
        <NativeBaseProvider>
          <Router />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
