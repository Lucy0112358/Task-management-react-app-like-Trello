import React, { useState } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { auth } from "../firebase-conf/index";
import { onAuthStateChanged } from "firebase/auth";
export default function Boards({ task, setTask, targetURL }) {
  const boards = [
    "Javascript",
    "React.js",
    "Quality assurance",
    "Chess lesson",
    "Clean room",
  ];

  const [board] = useState(boards);
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return (
    <div>
      {board.map((item) => (
        <li>
          Project{" "}
          <Link
            to={"/boards/" + item}
            key={item}
            onClick={(event) => setTask(item)}
          >
            {item}
          </Link>
        </li>
      ))}
      <Logout />
    </div>
  );
}
