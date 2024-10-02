import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg0vi8c2yUDOJgQLOhkISzQS3gfrxXfiU",
  authDomain: "emotion-detector-95a5c.firebaseapp.com",
  projectId: "emotion-detector-95a5c",
  storageBucket: "emotion-detector-95a5c.appspot.com",
  messagingSenderId: "780017114939",
  appId: "1:780017114939:web:f592fc9a309217ce93a11e",
  measurementId: "G-1CL7M5BH2E"
};

// Create root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within Firebase provider
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
