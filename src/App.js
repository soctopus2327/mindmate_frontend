// src/App.js
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
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
import SignIn from './components/SignIn';
import { auth } from './firebase/firebaseConfig'; // Update this path
import { onAuthStateChanged } from 'firebase/auth';
import EmotionTracker from './components/EmotionTracker';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mental-health" element={<MentalHealthPage />} />
        <Route path="/health-management" element={<HealthManagement />} />
        <Route path="/daily-question" element={<DailyQuestionsPage />} />
        <Route path="/emotion-tracker" element={<EmotionTracker />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* Add Chatbot route based on user state */}
        <Route path="/chatbot" element={user ? <Chatbot /> : <SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
