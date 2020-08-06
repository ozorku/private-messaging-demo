import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLUowhWsYJVCqf6Rmnyda5-4qCcJw4FrI",
  authDomain: "playground-34626.firebaseapp.com",
  databaseURL: "https://playground-34626.firebaseio.com",
  projectId: "playground-34626",
  storageBucket: "playground-34626.appspot.com",
  messagingSenderId: "752891252545",
  appId: "1:752891252545:web:1465ff91c6f766f7b89bc0",
  measurementId: "G-VD408M0PJ3",
};

//initialize firebase app
firebase.initializeApp(firebaseConfig);

// expor db foraccess
const DB = firebase.firestore();
export { DB };
