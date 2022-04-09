// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgO1R5GfH1cB5NdnEYdMkY1-awJWCpLBg",
  authDomain: "task-management-74bc8.firebaseapp.com",
  projectId: "task-management-74bc8",
  storageBucket: "task-management-74bc8.appspot.com",
  messagingSenderId: "941735114363",
  appId: "1:941735114363:web:14a53ea495d95f45e114de",
  measurementId: "G-ETV27MDD9H",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const projectFireStore = firebase.firestore();

export { projectFireStore };
