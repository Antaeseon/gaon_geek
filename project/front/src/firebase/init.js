import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

var config = {
  apiKey: "AIzaSyD3dmxfoDWmFpYe5jaZNMx_xmtxra2LFpc",
  authDomain: "wearever1-153af.firebaseapp.com",
  databaseURL: "https://wearever1-153af.firebaseio.com",
  projectId: "wearever1-153af",
  storageBucket: "wearever1-153af.appspot.com",
  messagingSenderId: "95709586113",
  // appId: "1:95709586113:web:bdcaf9bf7b134d8d"
};
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true});

  export default firebaseApp.firestore();