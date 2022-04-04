import React, { useState } from "react";
import TaskList from "./taskList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
export default function Boards({ task, setTask }) {
  const boards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [board, setBoard] = useState(boards);
  console.log(`boards ` + task);
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
