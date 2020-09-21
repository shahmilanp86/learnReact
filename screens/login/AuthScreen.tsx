import React from 'react';

import firebase from 'firebase/app';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { connect, useSelector, useDispatch } from 'react-redux';
import ClientUsers from '../../models/ClientUsers';
import ConfigProperties from './../../models/ConfigProperties';
import Clients from './../../models/Clients';
import * as appUtils from './../../utils/appUtils';
import LoadSpinner from '../../components/LoadSpinner';
import { DocumentReference } from '@firebase/firestore-types';
import appConstants from './../../constants/appConstants';
import {
  fetchClientIdAction,
  fetchClientConfigAction,
  logoutUserAction,
  incrementAction,
} from './../../redux';

const AuthScreen = (props: any) => {
  // const [MyData, setMyData] = React.useState<Array<object>>([]);
  // const dispatch = useDispatch();
  const stateClientId = useSelector((state: any) => state.user.clientId);
  const stateClientIdStatus = useSelector(
    (state: any) => state.user.clientIdStatus
  );
  const stateClientConfigStatus = useSelector(
    (state: any) => state.user.clientConfigStatus
  );

  const stateBrandName = useSelector(
    (state: any) => state.user[appConstants.configs.BRAND_NAME]
  );

  // const stateClientIdStatus = useSelector(
  //   (state: any) => state.user.clientIdStatus
  // );
  const counter = useSelector((state: any) => state.user.counter);
  // const dispatchClientId = (clientId: string) => {
  //   dispatch({ type: appConstants.actionNames.SET_CLIENT_ID, clientId });
  // };
  // const dispatchSetClientConfigs = (clientConfig: Array<any>) => {
  //   dispatch({
  //     type: appConstants.actionNames.SET_MULTI_CONFIG_PROPS,
  //     clientConfig,
  //   });
  // };

  const myIncrement = () => {
    console.log('milan washere before : ', counter);
    console.log('milan washere before  props.counter: ', props.counter);
    props.incrementAction();

    console.log('milan washere after  props.counter: ', props.counter);
    console.log('milan washere after : ', counter);
  };

  const statusEnum = appConstants.statusEnum;
  // const [pageStatus, setPageStatus] = React.useState(statusEnum.loading);
  const logoutButtonHandler = () => {
    console.log('Loginn Clicked');
    props.logoutUserAction();
  };

  // const setIsLoading = () => {
  //   setPageStatus(statusEnum.loading);
  // };
  // const isLoading = () => {
  //   return statusEnum.loading === status;
  // };
  const fetchClientId = () => {
    props.fetchClientConfigAction(stateClientId);
    // dispatch({
    //   type: appConstants.actionNames.SET_CLIENT_ID,
    //   clientId: 'Milan baba',
    // });
  };

  // const fetchClientId = (): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     let db = firebase.firestore();
  //     let tmpClientId = '';
  //     dispatchClientId(tmpClientId);
  //     setIsLoading();
  //     db.collection(ClientUsers.COLLECTION_NAME)
  //       .where(ClientUsers.FIELD_active, '==', true)
  //       .where(
  //         ClientUsers.FIELD_email,
  //         '==',
  //         firebase.auth().currentUser?.email
  //       )
  //       .get()
  //       .then(function (querySnapshot) {
  //         if (querySnapshot.size) {
  //           querySnapshot.forEach(function (doc) {
  //             let obj = doc.data();
  //             console.log('data fetched: ', obj);
  //             tmpClientId = obj.client;
  //             console.log('before: stateClientId: ', stateClientId);
  //             dispatchClientId(tmpClientId);
  //             console.log('after: stateClientId: ', stateClientId);
  //           });
  //           setStatus(statusEnum.ready);
  //         } else {
  //           tmpClientId = '';
  //           dispatchClientId(tmpClientId);
  //           setStatus(statusEnum.notAuth);
  //         }
  //         resolve(tmpClientId);
  //       })
  //       .catch(function (error) {
  //         console.log('Error getting documents: ', error);

  //         setStatus(statusEnum.error);
  //         reject();
  //       });
  //   });
  // };

  // const fetchClientConfig = (clientId: string): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     setStatus(statusEnum.loading);

  //     appUtils
  //       .getFirestoreDbForClient(clientId)
  //       .collection(ConfigProperties.COLLECTION_NAME)
  //       .limit(100)
  //       .get()
  //       .then((querySnapshot) => {
  //         if (querySnapshot.size) {
  //           let configs: Array<any> = [];
  //           querySnapshot.forEach(function (doc) {
  //             let obj = doc.data();
  //             console.log('data fetched: ', obj);
  //             // dispatchClientId(obj.client);
  //           });
  //           dispatchSetClientConfigs(configs);
  //           setStatus(statusEnum.ready);
  //         } else {
  //           setStatus(statusEnum.error);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error('ERROR: ', err);
  //         setStatus(statusEnum.error);
  //       });
  //   });
  // };

  React.useEffect(() => {
    // setPageStatus(statusEnum.loading);
    console.log('Call Fb to get clientId');
    let userEmail = firebase.auth().currentUser?.email;
    props.fetchClientIdAction(userEmail);
    // fetchClientId().then(function (clientId) {
    //   // fetchClientConfig(clientId);
    // });
  }, []);
  React.useEffect(() => {
    if (stateClientId) {
      console.log(
        `######Client ID updated calling fetchClientConfig  for clientId : ${stateClientId}`
      );

      props.fetchClientConfigAction(stateClientId);
    }
  }, [stateClientId]);

  const errorView = (message: string) => {
    return (
      <View style={styles.container}>
        <Text>Unable to load your account Error: {message}</Text>
        <Button onPress={fetchClientId} title="Retry" />
        <Button onPress={logoutButtonHandler} title="Sign out" />
        <Button onPress={myIncrement} title="Incriment" />
        <Text>stateBrandName: : {stateBrandName}</Text>

        <Text>Counter: : {counter}</Text>
        <Text>props Counter: : {props.counter}</Text>
        <Text>Clinet ID: {stateClientId}</Text>
      </View>
    );
  };
  const loadingView = () => {
    return <LoadSpinner />;
  };
  const unAuthView = () => {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this account</Text>
        <Text>stateBrandName: : {stateBrandName}</Text>
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
          <Button onPress={myIncrement} title="Incriment" />
          <Text>Counter: : {counter}</Text>
          <Text>props Counter: : {props.counter}</Text>
          <Text>stateBrandName: : {stateBrandName}</Text>
          <Text>Clinet ID: {stateClientId}</Text>
        </View>
        <View style={[styles.container, styles.section]}>
          <Text>Clinet ID: {stateClientId}</Text>
          {/* <FlatList data={MyData} renderItem={renderItem}></FlatList> */}
        </View>
      </View>
    );
  };

  // const isPageLoading = () => {
  //   return stateClientIdStatus === appConstants.statusEnum.loading ;
  // }

  const getViewToDisplay = () => {
    if (
      [stateClientConfigStatus, stateClientIdStatus].every(
        (cur) => cur === statusEnum.loaded
      )
    ) {
      return readyView();
    }
    switch (stateClientIdStatus) {
      case statusEnum.loading:
        return loadingView();
      case statusEnum.notAuth:
        return unAuthView();
      case statusEnum.error:
        return errorView('Failed to load Client ID');
    }

    switch (stateClientConfigStatus) {
      case statusEnum.loading:
        return loadingView();
      case statusEnum.notAuth:
        return unAuthView();
      case statusEnum.error:
        return errorView('Failed to load Clinet Config');
    }

    return errorView(
      `Unknown error stateClientConfigStatus:${stateClientConfigStatus}, stateClientIdStatus:${stateClientIdStatus}`
    );
  };

  return <React.Fragment>{getViewToDisplay()}</React.Fragment>;
};
function mapStatestoProps(state: any) {
  return {
    clientId: state.user.clientId,
    counter: state.user.counter,
  };
}

// function mapDispatchtoProps(dispatch: Function) {
const mapDispatchtoProps = {
  fetchClientIdAction,
  fetchClientConfigAction,
  logoutUserAction,
  incrementAction,
};

// export default AuthScreen;
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
