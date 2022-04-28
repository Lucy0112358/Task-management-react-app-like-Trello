import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, signUp } from "../firebase-conf/index";
import { Input, Spacer, Loading } from "@nextui-org/react";
import { UnLockIcon } from "./UnLockIcon.js";
import { LockIcon } from "./LockIcon.js";

export default function RegistrationForm() {
  const email = useRef();
  const password = useRef();
  const [loader, setLoader] = useState(false);
  const makeNewUser = async () => {
    setLoader(true);
    try {
      await signUp(email.current.value, password.current.value);
      console.log(auth.currentUser.email);
    } catch (error) {
      alert(error.message);
    }
    setLoader(false);
  };
  return (
    <div className="input-divs">
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
      <Link to={"/"}>
        <button onClick={makeNewUser}>Sign Up</button>
      </Link>
    </div>
  );
}
