import { React, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-conf/index";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Loading } from "@nextui-org/react";

export default function Logout() {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const signOutUser = async () => {
    setLoader(true);
    signOut(auth);
  };
  return (
    <div>
      {loader && (
        <Loading color="warning" textColor="warning">
          One second...
        </Loading>
      )}
      {user?.email && <div> Account of user {user?.email}</div>}
      <Link to={"/"}>
        <button onClick={signOutUser}>Sign Out</button>
      </Link>
    </div>
  );
}
