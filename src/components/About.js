// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        Health Companion is dedicated to providing personalized support for those managing chronic illnesses.
        Our AI-driven solutions offer guidance, resources, and community support.
      </p>
    </div>
  );
};

export default About;
