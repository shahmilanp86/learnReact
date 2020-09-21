import React from 'react';

import ClientUsers from '../models/ClientUsers';
import ConfigProperties from './../models/ConfigProperties';
import Clients from './../models/Clients';
import { DocumentReference } from '@firebase/firestore-types';
import firebase from 'firebase/app';

const getFirestoreDbForClient = (clientId: string): DocumentReference => {
  let db = firebase.firestore();
  if (!clientId) {
    console.error('ClinetID is is not passed cannot fetch DB');
    throw 'ClinetID is is not passed cannot fetch DB';
  }

  let clientDbDocumentReference: DocumentReference = db
    .collection(Clients.COLLECTION_NAME)
    .doc(clientId);
  return clientDbDocumentReference;
};
export { getFirestoreDbForClient };
