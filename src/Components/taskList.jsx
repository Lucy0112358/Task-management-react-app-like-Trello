import React from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import Modal from "./Modal.jsx";
import Addtask from "./Addtask";
import { db } from "../firebase-conf/index";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { Loading } from "@nextui-org/react";
import Logout from "./Logout";
import getStorage from "../helpers/getStorage.js";
export default function TaskList({ task, setModal, isModalOpen }) {
  const records = collection(db, "tasks");
  const [tasks, setTasks] = useState([]);

  const [modal, setModalContent] = useState([]);
  const [addnewtask, setAddnewtask] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let params = useParams();
  let tabname = params.id;

  const q = query(records, where(`userID`, `==`, getStorage(`isLoggedIn`)));
  useEffect(() => {
    try {
      setLoader(true);
      const asyncronous = async () => {
        const data = await getDocs(q);
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      asyncronous();
    } catch {
      alert(`error`);
    }
    setLoader(false);
  }, []);

  const modalContent = (elem) => {
    //navigate(`/boards/${tabname}/${elem}`);
    setModal(true);
    tasks.map((item) => (item.id === elem ? setModalContent(item) : 1));
  };

  const modalStyle = { display: `none` };

  const removeTask = async (e, id) => {
    e.stopPropagation();
    console.log(e, id);
    const itemToDelete = doc(db, "tasks", id);
    await deleteDoc(itemToDelete);
  };

  return (
    <div>
      <Text
        h1
        size={30}
        css={{
          textGradient: "45deg, $blue500 -20%, $pink500 50%",
        }}
        weight="bold"
        onClick={() => setModal(true)}
      >
        Project {tabname}
      </Text>
      <Logout />
      {isModalOpen && (
        <div>
          <Modal
            isModalOpen={isModalOpen}
            setModal={setModal}
            modal={modal}
            modalStyle={modalStyle}
            setModalContent={setModalContent}
            tasks={tasks}
            setTasks={setTasks}
            db={db}
          />
          <button onClick={() => setModal(false)}>Close modal</button>
        </div>
      )}

      <div className="parent-div">
        <div>
          <Text color="#ff4ecd">To do</Text>
          <button onClick={() => setAddnewtask(true)}>Add a task</button>
          {addnewtask && (
            <Addtask
              records={records}
              tabname={tabname}
              tasks={tasks}
              setTasks={setTasks}
              setAddnewtask={setAddnewtask}
            />
          )}
          {tasks.map((task1) =>
            task1.category === tabname && task1.status === `todo` ? (
              <div
                className="first-title"
                onClick={() => modalContent(task1.id)}
              >
                <li>Title: {task1.title}</li>
                <li>Status: {task1.status}</li>
                <li>Task number {task1.id}</li>
                <li>Project {task1.category}</li>
                <button onClick={(e) => removeTask(e, task1.id)}>
                  Delete task
                </button>
              </div>
            ) : null
          )}
        </div>

        <div>
          <Text color="#ff4ecd">Doing</Text>
          {loader && (
            <Loading color="error" textColor="error" className="input-divs">
              {" "}
              Amazing data!{" "}
            </Loading>
          )}
          {tasks.map((task1) =>
            task1.category === tabname && task1.status === `doing` ? (
              <div className="first-title">
                <li onClick={() => modalContent(task1.id)}>
                  Title: {task1.title}
                </li>
                <li onClick={() => modalContent(task1.id)}>
                  Status: {task1.status}
                </li>
                <li onClick={() => modalContent(task1.id)}>
                  Task number {task1.id}
                </li>
                <li onClick={() => modalContent(task1.id)}>
                  Project {task1.category}
                </li>
                <button onClick={() => removeTask(task1.id)}>
                  Delete task
                </button>
              </div>
            ) : null
          )}
        </div>

        <div>
          <Text color="primary">Completed</Text>
          {tasks.map((taskItem) => {
            const { category, status, title, id } = taskItem;
            return category === tabname && status === `done` ? (
              <div className="first-title" onClick={() => modalContent(id)}>
                {" "}
                <li onClick={() => modalContent(id)}>Title: {title}</li>
                <li onClick={() => modalContent(id)}>Status: {category}</li>
                <li>Task number {id}</li>
                <li>Project {category}</li>
                <button onClick={() => removeTask(id)}>Delete task</button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
