import React from "react";
import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import Modal from "./Modal.jsx";
import Addtask from "./Addtask";
import { db } from "../firebase-conf/index";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Loading } from "@nextui-org/react";

export default function TaskList({ task }) {
  const records = collection(db, "tasks");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModal] = useState(false);
  const [modal, setModalContent] = useState([]);
  const [addnewtask, setAddnewtask] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const asyncronous = async () => {
      const data = await getDocs(records);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
    };

    asyncronous();
  }, []);

  const modalContent = (elem) => {
    setModal(true);
    tasks.map((item) => (item.id === elem ? setModalContent(item) : null));
    console.log(modal);
  };

  const modalStyle = { display: `none` };
  const removeTask = async (id) => {
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
        Project {task}
      </Text>
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
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              setAddnewtask={setAddnewtask}
            />
          )}
          {tasks.map((task1) =>
            task1.category === task && task1.status === `todo` ? (
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
          <Text color="#ff4ecd">Doing</Text>
          {loader &&  <Loading color="error" textColor="error" className="input-divs"> Amazing data! </Loading>}
          {tasks.map((task1) =>
            task1.category === task && task1.status === `doing` ? (
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
            return category === task && status === `done` ? (
              <div className="first-title">
                {" "}
                <li onClick={() => modalContent(id)}>Title: {title}</li>
                <li onClick={() => modalContent(id)}>Status: {category}</li>
                <li onClick={() => modalContent(id)}>Task number {id}</li>
                <li onClick={() => modalContent(id)}>Project {category}</li>
                <button onClick={() => removeTask(id)}>Delete task</button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
