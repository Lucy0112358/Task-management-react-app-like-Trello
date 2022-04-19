import "./App.css";
import { useEffect, useState } from "react";
import getStorage from "./helpers/getStorage.js";
import setStorage from "./helpers/setStorage.js";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Components/taskList";
import Boards from "./Components/boards";
import OneTask from "./Components/oneTask";
function App() {
  const [isLoggedIn] = useState(getStorage() || false);
  const [task, setTask] = useState(`test`);
  useEffect(() => {
    setStorage(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route
            path="/boards"
            element={<Boards task={task} setTask={setTask} />}
          />
          <Route path="/tasklist" element={<TaskList task={task} />} />
          <Route path="/oneTask" element={<OneTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
