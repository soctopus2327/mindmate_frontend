import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const MentalHealthPage = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState('Neutral');
  const [response, setResponse] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    setSpeechSynthesis(window.speechSynthesis);
  }, []);

  const analyzeEmotion = async () => {
    if (webcamRef.current) {
      // Mocking the emotion detection to always set to 'Happy'
      setEmotion('Happy');
      setResponse('You seem happy!');
      await getChatbotResponse('I am feeling happy');
    }
  };

  const getChatbotResponse = async (message) => {
    try {
      const res = await fetch('http://localhost:8000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChatResponse(data.message);
      speakResponse(data.message);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setChatResponse('Error communicating with chatbot.');
    }
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    await getChatbotResponse(userInput);
    setUserInput('');
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      getChatbotResponse(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  };

  const speakResponse = (text) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Mental Health Support</h1>
      {isCameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-auto"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user",
          }}
        />
      )}
      <button
        onClick={toggleCamera}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      <button
        onClick={analyzeEmotion}
        className={`mt-4 p-2 bg-blue-500 text-white rounded ${!isCameraOn ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isCameraOn}
      >
        Analyze My Emotion
      </button>
      <div className="mt-4">
        <h2 className="text-lg">Detected Emotion: {emotion}</h2>
        <h2 className="text-lg">Response: {response}</h2>
      </div>
      <form onSubmit={handleUserInput} className="mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 w-full"
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
      <button
        onClick={toggleListening}
        className={`mt-4 p-2 ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div className="mt-4">
        <h2 className="text-lg">Chatbot Response: {chatResponse}</h2>
      </div>
    </div>
  );
};

export default MentalHealthPage;
