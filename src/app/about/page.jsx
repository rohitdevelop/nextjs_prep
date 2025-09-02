"use client";

import React, { useState, useEffect } from "react";

const TitleUpdater = () => {
  const [text, setText] = useState("Hello Rohit 🚀");

  // Effect to update the tab title whenever `text` changes
  useEffect(() => {
    document.title = text;
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">📝 Title Updater</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-4 py-2 text-black rounded-lg w-80"
        placeholder="Type something..."
      />

      <p className="mt-4 text-lg">
        Current title: <span className="font-bold">{text}</span>
      </p>
    </div>
  );
};

export default TitleUpdater;
