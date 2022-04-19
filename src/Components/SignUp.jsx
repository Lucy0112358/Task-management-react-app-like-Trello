import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, signUp } from "../firebase-conf/index";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function SignUp() {
  const email = useRef();
  const password = useRef();
  const [user, setUser] = useState({});
  const goToPage = useRef();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const makeNewUser = async () => {
    try {
      await signUp(email.current.value, password.current.value);
      console.log(auth.currentUser.email);
    } catch (error) {
      alert(error.message);
    }
  };
  const signInUser = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      goToPage.current.click();
    } catch (error) {
      alert(error.message);
    }
  };
  const signOutUser = async () => {
    signOut(auth);
  };
  return (
    <div>
      <input ref={email} />
      <input ref={password} />
 {user?.email && <div> Account of user</div>}
      <Link ref={goToPage} to={"/boards"}></Link>
      {user?.email}
      <button onClick={makeNewUser}>Sign Up</button>
      <button onClick={signInUser}>Sign In</button>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
}
