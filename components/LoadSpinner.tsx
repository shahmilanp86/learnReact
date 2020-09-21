import * as React from 'react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
const LoadSpinner = (props: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading please wait...</Text>
    </View>
  );
};

export default LoadSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
