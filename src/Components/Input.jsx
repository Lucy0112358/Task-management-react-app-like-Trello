import React from "react";

export default function Input({ value, name, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
}
