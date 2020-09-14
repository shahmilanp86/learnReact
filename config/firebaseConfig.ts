import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
export const drShahConfig = {
  apiKey: 'AIzaSyAeIQjypOdi2EB11A1DISnhKECVITzaK2c',
  authDomain: 'fir-demo-77d69.firebaseapp.com',
  databaseURL: 'https://fir-demo-77d69.firebaseio.com',
  projectId: 'fir-demo-77d69',
  storageBucket: 'fir-demo-77d69.appspot.com',
  messagingSenderId: '316425805395',
};

export const multiUserConfig = {
  apiKey: 'AIzaSyB8SNAUBfuxNONu84D0-B6DE7ZUrtqjrXc',
  authDomain: 'drpatientrecord.firebaseapp.com',
  databaseURL: 'https://drpatientrecord.firebaseio.com',
  projectId: 'drpatientrecord',
  storageBucket: 'drpatientrecord.appspot.com',
  messagingSenderId: '1049636241456',
};

export const webClientId: string =
  '1049636241456-rnaahqd1h8cbffkn6bvfv0ipv0mmblrr.apps.googleusercontent.com';

export function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(multiUserConfig);
    // firebase.firestore().enablePersistence({ synchronizeTabs: true });
    // const db = firebase.firestore();

    // db.settings({
    //   timestampsInSnapshots: true,
    // });
  }
}
