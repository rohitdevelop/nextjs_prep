"use client";

import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function textChange(e) {
    setText(e.target.value);
  }

  function addClick() {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTodos([...todos, newTodo]);
    setText("");
  }

  function toggleComplete(id) {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addClick();
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ✨ Todo App
          </h1>
          <p className="text-white/80 text-lg">
            Stay organized and productive
          </p>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-xl border border-white/20">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                value={text}
                onChange={textChange}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="w-full px-6 py-4 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
              />
            </div>
            <button
              onClick={addClick}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </span>
            </button>
          </div>
        </div>

        {/* Stats */}
        {totalCount > 0 && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-xl border border-white/20">
            <div className="flex justify-between items-center text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalCount}</div>
                <div className="text-sm opacity-80">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">{completedCount}</div>
                <div className="text-sm opacity-80">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{totalCount - completedCount}</div>
                <div className="text-sm opacity-80">Remaining</div>
              </div>
            </div>
            {totalCount > 0 && (
              <div className="mt-4">
                <div className="bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-white/60 text-lg">No tasks yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:bg-white/30 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-white/50 hover:border-white'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`text-lg font-medium transition-all duration-300 ${
                      todo.completed 
                        ? 'line-through text-white/60' 
                        : 'text-white'
                    }`}>
                      {todo.text}
                    </p>
                    <p className="text-white/50 text-sm">{todo.createdAt}</p>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}