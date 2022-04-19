import React, { useState } from "react";
import Input from "./Input";
import { addDoc } from "firebase/firestore";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
export default function Addtask({
  setTasks,
  records,
  setAddnewtask,
  tasks,
  task,
}) {
  const [title, setTitile] = useState(``);
  const [description, setDescription] = useState(``);
  const [priority, setPriority] = useState(``);
  const addnewtask = async () => {
    setAddnewtask(false);
    if(title && description && priority){
    await addDoc(records, {
      category: task,
      title: title,
      description: description,
      status: `todo`,
      priority: priority,
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
