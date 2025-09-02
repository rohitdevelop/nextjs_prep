"use client";

import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  function textchange(e) {
    setText(e.target.value);
  }

  function addclick() {
    if (text.trim() === "") return; // prevent empty todos
    setTodo([...todo, text]); // storing string
    setText(""); // reset input
  }


  return (
    <div className="text-center border-2 border-b-lime-400 bg-white text-black">
      <h1 className="text-4xl">todo app</h1>
      <div>
        <input
          value={text}
          onChange={textchange}
          className="bg-black text-white"
          type="text"
        />
        <button onClick={addclick} className=" bg-amber-400">
          add
        </button>
      </div>

      <ul>
        {todo.map((tod, index) => (
          <li key={index}>{tod}</li>  
        ))}
      </ul>
    </div>
  );
}
