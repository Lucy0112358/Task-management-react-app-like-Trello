import React from "react";
import { useEffect, useState } from "react";
import { Text, Grid, Card } from "@nextui-org/react";

export default function TaskList({task}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
        console.table(json);
      });
  }, []);
  console.log(`tasklist ` +task)
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
<div className="parent-div">
  <div>
      <Text color="#ff4ecd">To do</Text>
      {tasks.map(({ userId, completed, id, title }) =>
        userId === parseInt(task) && completed === false ? (
          <div className="first-title">
            <li>Title: {title}</li>
            <li>Status: to do</li>
            <li>Task number {id}</li>
            <li>Project {userId}</li>
          </div>
        ) : (
          console.log(1)
        )
      )}
      </div>
      <div >
      <Text color="primary">Completed</Text>
      {tasks.map(({ userId, completed, title, id }) =>
        userId === parseInt(task) && completed === true ? (
          <div className="first-title">
            {" "}
            <li>Title:  {title}</li>
            <li>Status: Done</li>
            <li>Task number {id}</li>
            <li>Project {userId}</li>
          </div>
        ) : (
          console.log(1)
        )
      )}
      </div>
      </div>
    </div>
  );
}
