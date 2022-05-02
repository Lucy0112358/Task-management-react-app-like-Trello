import "./App.css";
import { useState } from "react";
import setStorage from "./helpers/setStorage.js";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Components/taskList";
import Boards from "./Components/boards";
import { auth } from "./firebase-conf/index";
// import OneTask from "./Components/oneTask"; call site compile time, runtime execution context, web api, callback queq, call stack , global execution context, microtask, macrotask
import RegistrationForm from "./Components/RegistrationForm";
import Logout from "./Components/Logout";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "./Components//Modal.jsx";
function App() {
  const [task, setTask] = useState(`test`);
  onAuthStateChanged(auth, (currentUser) => {
    currentUser ? setStorage(currentUser.uid) : setStorage(false);
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route
            path="/boards"
            element={<Boards task={task} setTask={setTask} />}
          />
          <Route path={"/boards/:id"} element={<TaskList task={task} />} />
          {/* <Route path="/oneTask" element={<OneTask />} /> */}
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/boards/:id/:singleTask" element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
