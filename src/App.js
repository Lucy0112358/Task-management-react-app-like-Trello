import "./App.css";
import { useEffect, useState } from "react";
import getStorage from "./helpers/getStorage.js";
import setStorage from "./helpers/setStorage.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Components/taskList";
import Boards from "./Components/boards";
import OneTask from "./Components/oneTask";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(getStorage() || false);
  const [task, setTask] = useState(`test`);
  useEffect(() => {
    setStorage(isLoggedIn);
  }, [isLoggedIn]);
  const login = () => {
    setisLoggedIn((prev) => !prev);
  };
  console.log(`app ` + task);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Boards task={task} setTask={setTask} />} />
          <Route path="/tasklist" element={<TaskList task={task} />} />
          <Route path="/oneTask" element={<OneTask />} />
        </Routes>
      </BrowserRouter>
      <div className="App">
        <form>
          <label>
            Email
            <input type="text" name="name" />
          </label>
          <button onClick={login}>Enter</button>
        </form>
      </div>
    </>
  );
}

export default App;
