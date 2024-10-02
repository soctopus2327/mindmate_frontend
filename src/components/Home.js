// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <header className="text-center p-10">
        <h1 className="text-5xl font-bold text-blue-600">Welcome to Health Companion</h1>
        <p className="text-lg text-gray-700">Your AI-powered health assistant</p>
      </header>
      <main className="flex flex-col items-center">
        <button className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default Home;
