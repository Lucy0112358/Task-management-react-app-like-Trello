import React, { useState } from "react";
import Input from "./Input";
import { addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-conf/index";
export default function Addtask({ records, setAddnewtask, tasks, tabname }) {
  const [title, setTitile] = useState(``);
  const [description, setDescription] = useState(``);
  const [priority, setPriority] = useState(``);
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const addnewtask = async () => {
    setAddnewtask(false);
    if (title && description && priority) {
      await addDoc(records, {
        category: tabname,
        title: title,
        description: description,
        status: `todo`,
        priority: `low`,
        userID: user.uid,
      });
    }
    console.log(tasks);
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <Input
          value={title}
          name="title"
          onChange={(event) => setTitile(event.target.value)}
        />
        <Input
          value={description}
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Input
          value={priority}
          name="priority"
          onChange={(event) => setPriority(event.target.value)}
        />
        <button onClick={addnewtask}>Add task</button>
      </div>
    </div>
  );
}
