import React from "react";
import { useRef } from "react";
import {doc, updateDoc} from "firebase/firestore"
export default function Modal({
  db,
  tasks,
  modal,
  setModal,
  setTasks,
  setModalContent,
}) {
  const input = useRef(null);
  // const editTitile = (item) => {
  //   setModalContent({ ...item, title: input.current.value });
  //   tasks.map((element) =>
  //     element.id === item.id
  //       ? setTasks((prev) =>
  //           prev.map((mapped) =>
  //             mapped.id === item.id
  //               ? { ...mapped, title: input.current.value }
  //               : mapped
  //           )
  //         )
  //       : null
  //   );
  // };
  const editTitle = async ({id, title}) =>{
    const taskTitle = doc(db, "tasks", id)
    await updateDoc(taskTitle, {title: input.current.value})
  }
  return (
    <div className="modal">
      {/* modal <br></br> */}
      <div className="modalContent">
        {" "}
        <li>Title: {modal.title}</li>
        <input ref={input} type="text" />
        <button onClick={() => editTitle(modal)}>Edit title</button>
        <li>Done: {JSON.stringify(modal.completed)}</li>
        <li>Task number {modal.id}</li>
        <li>Project {modal.userId}</li>
        <button onClick={() => setModal(false)}> Close</button>
      </div>
    </div>
  );
}
