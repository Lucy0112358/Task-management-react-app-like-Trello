import React from "react";
import { useEffect, useState, useRef } from "react";
import { Text, Grid, Card } from "@nextui-org/react";

export default function TaskList({ task }) {
  const [tasks, setTasks] = useState([]);
  const modalRef = useRef(null);
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
  const modalStyle = { display: `none` };
  const closeModal = () => {
    setModal(true);
  };

  const modalContent = (elem) => {
    setModal(false);
    tasks.map((item) => (item.id === elem ? setModalContent(item) : null));
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
      >
        Project {task}
      </Text>
      <div
        ref={modalRef}
        style={isModalOpen ? modalStyle : null}
        onClick={() => closeModal()}
      >
        modal <br></br>
        <div> <li>Title: {modal.title}</li>
                <li>Done: {JSON.stringify(modal.completed)}</li>
                <li>Task number {modal.id}</li>
                <li>Project {modal.userId}</li></div>
      </div>
      <div className="parent-div">
        <div>
          <Text color="#ff4ecd">To do</Text>
          {tasks.map(({ userId, completed, id, title }) =>
            userId === parseInt(task) && completed === false ? (
              <div className="first-title" onClick={() => modalContent(id)}>
                <li>Title: {title}</li>
                <li>Status: to do</li>
                <li>Task number {id}</li>
                <li>Project {userId}</li>
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
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
