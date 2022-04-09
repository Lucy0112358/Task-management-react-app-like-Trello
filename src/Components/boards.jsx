import React, { useState } from "react";

import { Link } from "react-router-dom";
export default function Boards({ task, setTask }) {
  const boards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
