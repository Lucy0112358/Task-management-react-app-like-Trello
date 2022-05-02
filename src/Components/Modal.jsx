import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import getStorage from "../helpers/getStorage.js";
import { db } from "../firebase-conf/index";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
export default function Modal() {
  const input = useRef(null);
  const records = collection(db, "tasks");
  const [tasks, setTasks] = useState([]);
  const { singleTask } = useParams();
  const { id } = useParams();

  const editTitle = async ({ id, title }) => {
    const taskTitle = doc(db, "tasks", id);
    await updateDoc(taskTitle, { title: input.current.value });
  };
  const updateStatus = async (e, { id, status }) => {
    const taskTitle = doc(db, "tasks", id);
    await updateDoc(taskTitle, { status: e.target.value });
  };
  const navigate = useNavigate();
  let params = useParams();
  let tabname = params.id;
  const q = query(records, where(`userID`, `==`, getStorage(`isLoggedIn`)));
  useEffect(() => {
    try {
      const asyncronous = async () => {
        const data = await getDocs(q);
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      asyncronous();
    } catch {
      alert(`error`);
    }
  }, []);
  const task = tasks.filter((item) => item.id === singleTask)[0];
  console.log(task);
  return (
    <div className="modal">
      <div className="modalContent">
        {" "}
        <li>Project {id}</li>
        <li>Title: {task?.title}</li>
        <input ref={input} type="text" />
        <button onClick={() => editTitle(task)}>
          Edit {task ? task.title : null}
        </button>
        <li>Done: {task?.status}</li>
        <select onChange={(e) => updateStatus(e, task)}>
          <option value="todo">To do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <li>Task {task?.id}</li>
        <button onClick={() => navigate(`/boards/${tabname}`)}> Close</button>
      </div>
    </div>
  );
}
