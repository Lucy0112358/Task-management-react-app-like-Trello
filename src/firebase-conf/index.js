import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDgO1R5GfH1cB5NdnEYdMkY1-awJWCpLBg",
  authDomain: "task-management-74bc8.firebaseapp.com",
  projectId: "task-management-74bc8",
  storageBucket: "task-management-74bc8.appspot.com",
  messagingSenderId: "941735114363",
  appId: "1:941735114363:web:8c7a8d4504acdfdae114de",
  measurementId: "G-KJW7C7YPYR",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
