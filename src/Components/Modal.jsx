import React from "react";
import { useRef } from "react";
export default function Modal({ tasks, modal, setTasks, setModalContent }) {
  const input = useRef(null);
  const editTitile = (item) => {
    setModalContent({ ...item, title: input.current.value });
    tasks.map((element) =>
      element.id === item.id
        ? setTasks((prev) =>
            prev.map((mapped) =>
              mapped.id === item.id
                ? { ...mapped, title: input.current.value }
                : mapped
            )
          )
        : null
    );
  };
  return (
    <div>
      modal <br></br>
      <div>
        {" "}
        <li>Title: {modal.title}</li>
        <input ref={input} type="text" />
        <button onClick={() => editTitile(modal)}>Edit title</button>
        <li>Done: {JSON.stringify(modal.completed)}</li>
        <li>Task number {modal.id}</li>
        <li>Project {modal.userId}</li>
      </div>
    </div>
  );
}
