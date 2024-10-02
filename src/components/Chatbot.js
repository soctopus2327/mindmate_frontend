import React, { useState } from 'react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  // Function to send message to backend API
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      

      // Parse the response from the backend
      const data = await res.json();
      setResponse(data.response); // Set the response in the state
      setUserInput(''); // Clear the input field
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Chatbot</h1>
      <form onSubmit={sendMessage} className="flex mb-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask something..."
          className="border p-2 flex-grow"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4">Send</button>
      </form>
      <div className="border p-2">
        <h2 className="font-bold">Response:</h2>
        <p>{response}</p> {/* Display the response */}
      </div>
    </div>
  );
};

export default Chatbot;
