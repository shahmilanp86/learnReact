import React from 'react';

import firebase from 'firebase/app';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
import ClientUsers from './../../models/clientUsers';
import LoadingSpinner from './../../components/loadingSpinner';
const AuthScreen = (props: any) => {
  // const [MyData, setMyData] = React.useState<Array<object>>([]);
  const statusEnum = {
    loading: 'loading',
    error: 'error',
    notAuth: 'notAuth',
    ready: 'ready',
  };
  const [status, setStatus] = React.useState(statusEnum.loading);
  const logoutButtonHandler = () => {
    console.log('Loginn Clicked');
    props.setClientId('');
    firebase.auth().signOut();
  };
  const setIsLoading = () => {
    setStatus(statusEnum.loading);
  };
  const isLoading = () => {
    return statusEnum.loading === status;
  };
  const fetchClientId = () => {
    let db = firebase.firestore();
    props.setClientId('');
    setIsLoading();
    db.collection(ClientUsers.COLLECTION_NAME)
      .where(ClientUsers.FIELD_active, '==', true)
      .where(ClientUsers.FIELD_email, '==', firebase.auth().currentUser?.email)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size) {
          querySnapshot.forEach(function (doc) {
            let obj = doc.data();
            console.log('data fetched: ', obj);
            props.setClientId(obj.client);
          });
          setStatus(statusEnum.ready);
        } else {
          props.setClientId('');
          setStatus(statusEnum.notAuth);
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);

        setStatus(statusEnum.error);
      });
  };
  React.useEffect(() => {
    console.log('Call Fb to get clientId');
    fetchClientId();
  }, []);

  const errorView = () => {
    return (
      <View style={styles.container}>
        <Text>Unable to load your account</Text>
        <Button onPress={fetchClientId} title="Retry" />
        <Button onPress={logoutButtonHandler} title="Sign out" />
      </View>
    );
  };
  const loadingView = () => {
    return <LoadingSpinner />;
  };
  const unAuthView = () => {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this account</Text>
        <Button onPress={fetchClientId} title="Retry" />
        <Button onPress={logoutButtonHandler} title="Sign out" />
      </View>
    );
  };

  const readyView = () => {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Button onPress={fetchClientId} title="fetch ClientId again" />
          <Button onPress={logoutButtonHandler} title="Sign out" />
          <Text>Clinet ID: {props.clientId}</Text>
        </View>
        <View style={[styles.container, styles.section]}>
          <Text>Clinet ID: {props.clientId}</Text>
          {/* <FlatList data={MyData} renderItem={renderItem}></FlatList> */}
        </View>
      </View>
    );
  };

  const getViewToDisplay = (status: string) => {
    switch (status) {
      case statusEnum.loading:
        return loadingView();
      case statusEnum.ready:
        return readyView();
      case statusEnum.notAuth:
        return unAuthView();
      case statusEnum.error:
        return errorView();
    }
  };

  return <React.Fragment>{getViewToDisplay(status)}</React.Fragment>;
};
function mapStatestoProps(state: any) {
  return {
    clientId: state.clientId,
  };
}

function mapDispatchtoProps(dispatch: Function) {
  return {
    setClientId: (clientId: string) =>
      dispatch({ type: 'SET_CLIENT_ID', clientId }),
  };
}
export default connect(mapStatestoProps, mapDispatchtoProps)(AuthScreen);

const styles = StyleSheet.create({
  lineItem: {},
  title: {},
  section: {
    width: '50%', // is 50% of container width
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
});
