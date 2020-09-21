import firebase from 'firebase/app';
import ClientUsers from '../../models/ClientUsers';
import ConfigProperties from './../../models/ConfigProperties';
import Clients from './../../models/Clients';
import * as appUtils from './../../utils/appUtils';
import { DocumentReference } from '@firebase/firestore-types';
import appConstants from './../../constants/appConstants';

const incrementAction = () => {
  return {
    type: appConstants.actionNames.increment,
  };
};

// const setStatusClientIdAction = (status: string) => {
//   return {
//     type: appConstants.actionNames.SET_STATUS_CLIENT_ID,
//     status,
//   };
// };

//   const setClientIdAction = (status: string) => {
//     return {
//       type: appConstants.actionNames.SET_STATUS_CLIENT_ID,
//       status,
//     };
//   };

//   const setClientIdLoadingAction = (status: string) => {
//     return {
//       type: appConstants.actionNames.SET_STATUS_CLIENT_ID,
//       status,
//     };
//   };

//   const setClientIdErrorAction = (status: string) => {
//     return {
//       type: appConstants.actionNames.SET_STATUS_CLIENT_ID,
//       status,
//     };
//   };

// const setStatusClientConfigAction = (status: string) => {
//   return {
//     type: appConstants.actionNames.SET_STATUS_CLIENT_CONFIG,
//     status,
//   };
// };

const setClientIdAction = (type: string, clientId: string = '') => {
  return { type, clientId };
};
const setClientConfigsAction = (type: string, configList: Array<any> = []) => {
  return {
    type,
    configList,
  };
};

const fetchClientIdAction = (email: string) => {
  return (dispatch: any, getState: any) => {
    // console.log(getState().user.clientId);
    let db = firebase.firestore();
    dispatch(setClientIdAction(appConstants.actionNames.LOADING_CLIENT_ID));
    db.collection(ClientUsers.COLLECTION_NAME)
      .where(ClientUsers.FIELD_active, '==', true)
      .where(ClientUsers.FIELD_email, '==', email)
      .get()
      .then(function (querySnapshot) {
        let tmpClientId = '';
        if (querySnapshot.size) {
          querySnapshot.forEach(function (doc) {
            let obj = doc.data();
            console.log('data fetched: ', obj);
            tmpClientId = obj.client;
          });
          dispatch(
            setClientIdAction(
              appConstants.actionNames.SET_CLIENT_ID_LOADED,
              tmpClientId
            )
          );
        } else {
          dispatch(
            setClientIdAction(appConstants.actionNames.SET_CLIENT_ID_NOT_AUTH)
          );
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
        dispatch(
          setClientConfigsAction(appConstants.actionNames.SET_CLIENT_ID_ERROR)
        );
      });
  };
};

const fetchClientConfigAction = (clientId: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      setClientConfigsAction(
        appConstants.actionNames.LOADING_CLIENT_CONFIG_PROPS
      )
    );
    appUtils
      .getFirestoreDbForClient(clientId)
      .collection(ConfigProperties.COLLECTION_NAME)
      .limit(100)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size) {
          let configList: Array<any> = [];
          querySnapshot.forEach(function (doc) {
            let obj = doc.data();
            obj.key = doc.id;
            console.log('data fetched: ', obj);
            configList.push(obj);
          });
          dispatch(
            setClientConfigsAction(
              appConstants.actionNames.SET_CLIENT_CONFIG_MULT_PROPS,
              configList
            )
          );
        } else {
          dispatch(
            setClientConfigsAction(
              appConstants.actionNames.SET_CLIENT_CONFIG_ERROR
            )
          );
        }
      })
      .catch((err) => {
        console.error('ERROR: ', err);
        dispatch(
          setClientConfigsAction(
            appConstants.actionNames.SET_CLIENT_CONFIG_ERROR
          )
        );
      });
  };
};
export { fetchClientIdAction, fetchClientConfigAction, incrementAction };
