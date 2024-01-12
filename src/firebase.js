// import firebase from 'firebase/app'
// import 'firebase/auth'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyDXoN2jqdxtHsGeOlLNKHqG57ZojyemL_A",
    authDomain: "patient-portal-b97c4.firebaseapp.com",
    projectId: "patient-portal-b97c4",
    storageBucket: "patient-portal-b97c4.appspot.com",
    messagingSenderId: "738384044585",
    appId: "1:738384044585:web:a12ca6820e1690ff9c7238"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;