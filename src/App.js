// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Medication from './components/Medication';
import Contact from './components/Contact';
import MentalHealthPage from './components/MentalHealthPage';
import Chatbot from './components/Chatbot';
import HealthManagement from './components/HealthManagement';
import DailyQuestionsPage from './components/DailyQuestionsPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mental-health" element={<MentalHealthPage/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/health-management" element={<HealthManagement/>} />
        <Route path="/daily-question" element={<DailyQuestionsPage/>} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
