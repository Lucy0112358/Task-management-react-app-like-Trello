import React, { useState } from "react";

import { Link } from "react-router-dom";
export default function Boards({ task, setTask }) {
  const boards = ["Javascript", "React.js", "Quality assurance", "Chess lesson", "Clean room"];
  const [board] = useState(boards);

  return (
    <div>
      {board.map((item) => (
        <li>
          Project{" "} 
          <Link
            to={"/tasklist"}
            key={item}
            onClick={(event) => setTask(event.target.innerText)}
          >
            {item}
          </Link>
        </li>
      ))}
    </div>
  );
}
