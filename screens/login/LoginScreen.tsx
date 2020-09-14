import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase/app';
import { webClientId } from '../../config/firebaseConfig';
// Initialize Firebase
// initFirebase();

import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props: any) => {
  const ver = 1;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: webClientId,
  });

  console.log('Milan2 : request', request);
  console.log('Milan : response', response);
  console.log('Milan : promptAsync', promptAsync);

  React.useEffect(() => {
    console.log('response recieved');
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);
  console.log('Login Screen ' + ver);

  const loginButtonHandler = () => {
    console.log('Loginn Clicked');
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Text>Login To Contine</Text>
      <Button
        disabled={!request}
        onPress={loginButtonHandler}
        title={'Login With Google ' + ver}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
