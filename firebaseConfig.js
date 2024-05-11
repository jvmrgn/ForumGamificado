import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMÍNIO.firebaseapp.com",
  databaseURL: "https://projetobloco-f1e10-default-rtdb.firebaseio.com/", // URL do Realtime Database
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firebase};
