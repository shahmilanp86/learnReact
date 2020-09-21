import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//---- defined by me
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/login/LoginScreen';
import AuthScreen from './screens/login/AuthScreen';
import { initFirebase, multiUserConfig } from './config/firebaseConfig';

import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
import { isWeb } from './utils/commonUtils';
import { Provider } from 'react-redux';

let composeEnhancers = compose;
/* eslint-disable no-underscore-dangle */
if (isWeb() && window && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
/* eslint-enable */

const store = createStore(
  rootReducer /* preloadedState, */,
  composeEnhancers(applyMiddleware(...[logger, thunk]))
);

initFirebase();

const appSwitchNavigator = createSwitchNavigator({
  LandingScreen,
  LoginScreen,
  AuthScreen,
});

const BootupNavigator = createAppContainer(appSwitchNavigator);

const theme = {
  Text: {
    style: {},
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
            <BootupNavigator />

            <StatusBar />
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
