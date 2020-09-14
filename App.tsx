import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//---- defined by me
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/login/LoginScreen';
import AuthScreen from './screens/login/AuthScreen';
import { initFirebase, multiUserConfig } from './config/firebaseConfig';
initFirebase();

const appSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
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
      <React.Fragment>
        <SafeAreaProvider>
          <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
            <BootupNavigator />

            <StatusBar />
          </ThemeProvider>
        </SafeAreaProvider>
      </React.Fragment>
    );
  }
}
