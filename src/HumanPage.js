import React, { useState } from "react";
import "./HumanPage.css"; // Make sure to create this CSS file for styling

const HumanPage = () => {
  const [question, setQuestion] = useState(""); // This will be set when a new question comes in
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = async () => {
    // Here you would send the answer to your backend
    console.log(answer);
    // After submitting, clear the current answer
    setAnswer("");
    // Optionally, fetch the next question if that's how your flow works
  };

  return (
    <div className="human-page">
      <div className="question-display">
        <p>Question: {question}</p>
      </div>
      <div className="answer-section">
        <input
          type="text"
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAnswerSubmit}>Send</button>
      </div>
    </div>
  );
};

export default HumanPage;
