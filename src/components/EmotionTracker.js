import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const emotions = [
  { label: "Happy", color: "#ffeb3b" },
  { label: "Sad", color: "#2196f3" },
  { label: "Angry", color: "#f44336" },
  { label: "Neutral", color: "#9e9e9e" }
];

const EmotionTracker = () => {
  const [date, setDate] = useState(new Date());
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState({});

  useEffect(() => {
    fetchEmotionHistory();
  }, []);

  const fetchEmotionHistory = async () => {
    const querySnapshot = await getDocs(collection(db, "emotions"));
    const data = {};
    querySnapshot.forEach((doc) => {
      data[doc.data().date] = doc.data().emotion;
    });
    setEmotionHistory(data);
  };

  const saveEmotion = async () => {
    if (!selectedEmotion) return;

    const formattedDate = date.toISOString().split("T")[0];
    try {
      await addDoc(collection(db, "emotions"), {
        date: formattedDate,
        emotion: selectedEmotion
      });
      setEmotionHistory((prev) => ({
        ...prev,
        [formattedDate]: selectedEmotion
      }));
      alert("Emotion saved!");
    } catch (error) {
      console.error("Error saving emotion: ", error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const emotion = emotionHistory[formattedDate];
    const emotionObj = emotions.find((e) => e.label === emotion);

    return (
      emotionObj && (
        <div
          style={{
            backgroundColor: emotionObj.color,
            width: "100%",
            height: "100%",
            borderRadius: "50%"
          }}
        ></div>
      )
    );
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#333"
    },
    calendarContainer: {
      margin: "0 auto 20px",
      width: "fit-content"
    },
    emotionButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "15px"
    },
    emotionButton: {
      border: "none",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "transform 0.2s ease"
    },
    selectedEmotionButton: {
      border: "3px solid black"
    },
    saveButton: {
      marginTop: "20px",
      padding: "10px 30px",
      backgroundColor: "#4caf50",
      color: "white",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease"
    },
    saveButtonHover: {
      backgroundColor: "#45a049"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Emotion Tracker</h1>
      <div style={styles.calendarContainer}>
        <Calendar onChange={setDate} value={date} tileContent={tileContent} />
      </div>
      <div>
        <h3>Select your emotion for {date.toDateString()}:</h3>
        <div style={styles.emotionButtonsContainer}>
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => setSelectedEmotion(emotion.label)}
              style={{
                ...styles.emotionButton,
                backgroundColor: emotion.color,
                ...(selectedEmotion === emotion.label
                  ? styles.selectedEmotionButton
                  : {})
              }}
            >
              {emotion.label}
            </button>
          ))}
        </div>
        <button
          style={styles.saveButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          onClick={saveEmotion}
        >
          Save Emotion
        </button>
      </div>
    </div>
  );
};

export default EmotionTracker;
