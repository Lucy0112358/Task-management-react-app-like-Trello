import React, { useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router";
import { doc, updateDoc } from "firebase/firestore";

export default function Modal({ db, modal, setModal }) {
  const input = useRef(null);
  const { id } = useParams();
  const [status, setStatus] = useState(``)

  const editTitle = async ({ id, title }) => {
    const taskTitle = doc(db, "tasks", id);
    await updateDoc(taskTitle, { title: input.current.value });
  };
  const handleStatusChange = async (newStatus, { id, status }) => {
    setStatus(newStatus.target.value)
    const taskTitle = doc(db, "tasks", id);
    await updateDoc(taskTitle, { status: newStatus.target.value });
    console.log(newStatus.target.value);
  };
  // const handleStatusChange =(newStatus) =>{
    
  // }
  return (
    <div className="modal">
      <div className="modalContent">
        {" "}
        <li>Project {id}</li>
        <li>Title: {modal.title}</li>
        <input ref={input} type="text" />
        <button onClick={() => editTitle(modal)}>Edit title</button>
        <li>Status</li>
        <select onChange={(newStatus)=> handleStatusChange(newStatus, modal)  }>
       
          <option value="todo" >To do</option>
          <option value="doing" > Doing</option>
          <option value="done"> Done</option>
        </select>
        <li>Priority</li>
           <select>
          <option value="low">To do</option>
          <option value="medium"> Doing</option>
          <option value="high"> High</option>
        </select>
        <li>Task number {modal.id}</li>
        <button onClick={() => setModal(false)}> Close</button>
      </div>
    </div>
  );
}
