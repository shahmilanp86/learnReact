import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme = {
    Text: {
      style: {},
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <React.Fragment>
        <SafeAreaProvider>
          <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>
        </SafeAreaProvider>
      </React.Fragment>
    );
  }
}
