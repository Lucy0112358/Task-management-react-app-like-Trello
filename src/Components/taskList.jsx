import React from "react";
import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import Modal from "./Modal.jsx";

export default function TaskList({ task }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModal] = useState(true);
  const [modal, setModalContent] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
        console.table(json);
      });
  }, []);

  const modalContent = (elem) => {
    setModal(false);
    tasks.map((item) => (item.id === elem ? setModalContent(item) : null));
    console.log(modal);
  };
  const modalStyle = { display: `none` };
  const removeTask = (item) => {
    setTasks((prev) => prev.filter((element) => element.id !== item.id));
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
      {!isModalOpen && (
        <div>
          <Modal
            isModalOpen={isModalOpen}
            setModal={setModal}
            modal={modal}
            modalStyle={modalStyle}
            setModalContent={setModalContent}
            tasks={tasks}
            setTasks={setTasks}
          />
          <button onClick={() => setModal(true)}>Close modal</button>
        </div>
      )}

      <div className="parent-div">
        <div>
          <Text color="#ff4ecd">To do</Text>
          <button>Add a task</button>
          {tasks.map((task1) =>
            task1.userId === parseInt(task) && task1.completed === false ? (
              <div
                className="first-title"
                onClick={() => modalContent(task1.id)}
              >
                <li>Title: {task1.title}</li>
                <li>Status: to do</li>
                <li>Task number {task1.id}</li>
                <li>Project {task1.userId}</li>
                <button onClick={() => removeTask(task1)}>Delete task</button>
              </div>
            ) : null
          )}
        </div>
        <div>
          <Text color="primary">Completed</Text>
          {tasks.map(({ userId, completed, title, id }) =>
            userId === parseInt(task) && completed === true ? (
              <div className="first-title" onClick={() => modalContent(id)}>
                {" "}
                <li>Title: {title}</li>
                <li>Status: Done</li>
                <li>Task number {id}</li>
                <li>Project {userId}</li>
                <button>Delete task</button>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
