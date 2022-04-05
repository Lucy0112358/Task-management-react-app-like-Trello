import React from "react";
// import {  useState } from "react";
export default function Modal(isModalOpen ) {
 

  return (
    <div>
      modal <br></br>
      <div>
        {" "}
        <li>Title: {isModalOpen.modal.title}</li>
        <li>Done: {JSON.stringify(isModalOpen.modal.completed)}</li>
        <li>Task number {isModalOpen.modal.id}</li>
        <li>Project {isModalOpen.modal.userId}</li>
      </div>
    </div>
  );
}
