import React, { useState } from 'react';

const DailyQuestionsPage = () => {
  const [answers, setAnswers] = useState({
    academics: '',
    career: '',
    relationships: '',
  });
  const [savedAnswers, setSavedAnswers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save answers to structured format
    const newAnswerSet = {
      date: new Date().toLocaleDateString(),
      ...answers,
    };
    setSavedAnswers([...savedAnswers, newAnswerSet]);
    setAnswers({ academics: '', career: '', relationships: '' });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Daily Questions</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-2">
          <label className="block">Academics:</label>
          <input
            type="text"
            name="academics"
            value={answers.academics}
            onChange={handleInputChange}
            placeholder="How is your academic progress?"
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-2">
          <label className="block">Career:</label>
          <input
            type="text"
            name="career"
            value={answers.career}
            onChange={handleInputChange}
            placeholder="How are your career plans going?"
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-2">
          <label className="block">Relationships:</label>
          <input
            type="text"
            name="relationships"
            value={answers.relationships}
            onChange={handleInputChange}
            placeholder="How are your relationships?"
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Save Answers
        </button>
      </form>

      <div className="mt-5">
        <h2 className="text-lg font-bold">Saved Answers:</h2>
        <ul className="mt-2 space-y-4">
          {savedAnswers.map((answerSet, index) => (
            <li key={index} className="p-4 bg-gray-100 border rounded">
              <p className="font-bold">Date: {answerSet.date}</p>
              <p><strong>Academics:</strong> {answerSet.academics}</p>
              <p><strong>Career:</strong> {answerSet.career}</p>
              <p><strong>Relationships:</strong> {answerSet.relationships}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyQuestionsPage;
