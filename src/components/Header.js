// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <h2 className="text-white text-2xl">Health Companion</h2>
      <ul className="flex space-x-4 mt-2">
        <li><Link className="text-white hover:underline" to="/">Home</Link></li>
        <li><Link className="text-white hover:underline" to="/about">About</Link></li>
        <li><Link className="text-white hover:underline" to="/medication">Medication</Link></li>
        <li><Link className="text-white hover:underline" to="/contact">Contact</Link></li>
        <li><Link className="text-white hover:underline" to="/mental-health">Health Chatbot</Link></li>
        <li><Link className="text-white hover:underline" to="/daily-question">Daily Question</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
