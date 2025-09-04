"use client"

import React, { useState, useEffect } from 'react';

const page = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation trigger
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const increment = () => {
    setCount(count + 1);
    triggerAnimation();
  };

  const decrement = () => {
    setCount(count - 1);
    triggerAnimation();
  };

  const reset = () => {
    setCount(0);
    triggerAnimation();
  };

  // Get color based on count value
  const getCountColor = () => {
    if (count > 0) return 'text-green-400';
    if (count < 0) return 'text-red-400';
    return 'text-white';
  };

  // Get emoji based on count
  const getEmoji = () => {
    if (count >= 100) return '🚀';
    if (count >= 50) return '🎉';
    if (count >= 20) return '😄';
    if (count > 0) return '😊';
    if (count === 0) return '😐';
    if (count >= -10) return '😔';
    return '😢';
  };

  return (
    <div className='bg-gradient-to-br from-purple-900 via-black to-black h-screen w-full flex items-center justify-center p-4'>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            ⚡ Counter App
          </h1>
          <p className="text-purple-300 text-lg opacity-80">
            Track your progress with style
          </p>
        </div>

        {/* Main Counter Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          {/* Age Display */}
          <div className="text-center mb-8">
            <p className="text-white/70 text-lg mb-2">My age is</p>
            <div className={`text-8xl font-bold transition-all duration-200 ${getCountColor()} ${
              isAnimating ? 'scale-110' : 'scale-100'
            }`}>
              {count}
            </div>
            <div className="text-6xl mt-4 transition-all duration-300">
              {getEmoji()}
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white/5 rounded-2xl p-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">
                  {count > 0 ? `+${count}` : '0'}
                </div>
                <div className="text-white/60">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 font-bold text-lg">
                  {count < 0 ? Math.abs(count) : '0'}
                </div>
                <div className="text-white/60">Negative</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold text-lg">
                  {Math.abs(count)}
                </div>
                <div className="text-white/60">Absolute</div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="space-y-4">
            {/* Increment Button */}
            <button
              onClick={increment}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Increment
            </button>

            {/* Decrement Button */}
            <button
              onClick={decrement}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              </svg>
              Decrement
            </button>

            {/* Reset Button */}
            <button
              onClick={reset}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3 text-center">Fun Facts</h3>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Total clicks:</span>
              <span className="text-white font-medium">{Math.abs(count)}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`font-medium ${
                count > 0 ? 'text-green-400' : count < 0 ? 'text-red-400' : 'text-blue-400'
              }`}>
                {count > 0 ? 'Growing' : count < 0 ? 'Shrinking' : 'Balanced'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="text-purple-400 font-medium">
                {Math.floor(Math.abs(count) / 10) + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;