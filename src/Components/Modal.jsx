import React from "react";
import { useRef } from "react";
import { useParams } from "react-router";
import { doc, updateDoc } from "firebase/firestore";

export default function Modal({ db, modal, setModal, tasks }) {
  const input = useRef(null);
  const { singleTask } = useParams();

  const editTitle = async ({ id, title }) => {
    const taskTitle = doc(db, "tasks", id);
    await updateDoc(taskTitle, { title: input.current.value });
  };
  return (
    <div className="modal">
      <div className="modalContent">
        {" "}
        <li>Title: {singleTask}</li>
        <input ref={input} type="text" />
        <button onClick={() => editTitle(modal)}>Edit title</button>
        <li>Done: vfd</li>
        <li>Task number bn</li>
        <li>Project bnbn</li>
        <button onClick={() => setModal(false)}> Close</button>
      </div>
    </div>
  );
}
