import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-conf/index";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Input, Spacer, Loading } from "@nextui-org/react";
import { UnLockIcon } from "./UnLockIcon.js";
import { LockIcon } from "./LockIcon.js";

export default function SignUp() {
  const email = useRef();
  const password = useRef();
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const goToPage = useRef();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signInUser = async () => {

    setLoader(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log();
      goToPage.current.click();
    } catch (error) {
      alert(error.message);
    }
    setLoader(false);
  
  };

  return (
    <div className="input-divs">
      {/* <input ref={email} /> */}
      <Input ref={email} labelPlaceholder="Email" />
      {loader && (
        <Loading color="warning" textColor="warning">
          One second...
        </Loading>
      )}
      <Spacer y={1.6} />
      <Input.Password
        ref={password}
        labelPlaceholder="Password"
        visibleIcon={<UnLockIcon fill="currentColor" />}
        hiddenIcon={<LockIcon fill="currentColor" />}
      />

      {/* <input ref={password} /> */}
      {user?.email && <div> Account of user {user?.email}</div>}

      <Link ref={goToPage} to={"/boards"}></Link>
      <button onClick={signInUser}>Sign In</button>
    </div>
  );
}
