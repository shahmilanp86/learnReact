import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app';
import LoadingSpinner from '../components/LoadingSpinner';

// import * as Random from 'expo-random';

const LandingScreen = (props: any) => {
  const isLoggedIn = async () => {
    console.log('props : ', props);
    // var firebaseMock = {
    //   auth: function () {
    //     return {
    //       onAuthStateChanged: function (user: any) {
    //         return Promise;
    //       },
    //     };
    //   },
    // };
    firebase.auth().onAuthStateChanged((user: any) => {
      console.log('Loading Scren : onAuthStateChanged user: ', user);
      //   console.log('user : ', user, ' nav: ', props.navigation.navigate);
      if (user) {
        props.navigation.navigate('AuthScreen');
      } else {
        props.navigation.navigate('LoginScreen');
      }
    });
  };
  //   async function name() {
  //     console.log('Milan Shah X Random:', Random);

  //     const bytes = await Random.getRandomBytesAsync(10);
  //     console.log('Milan Shah X  bytes: ', bytes);
  //   }
  useEffect(() => {
    console.log('entered useEffect');
    // name();
    isLoggedIn();
  }, []);

  return (
    <React.Fragment>
      <LoadingSpinner></LoadingSpinner>
    </React.Fragment>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
