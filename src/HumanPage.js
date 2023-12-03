import React, { useState } from "react";
import "./HumanPage.css"; // Make sure to create this CSS file for styling

const HumanPage = () => {
  const [question, setQuestion] = useState("What's your favourite colour?"); // Placeholder question
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = () => {
    // Submit the answer to the backend
    console.log("Submitted answer:", answer);
    // Reset the answer input
    setAnswer("");
    // Fetch the next question if applicable
  };

  return (
    <div className="HumanPage">
      <div className="question-box">
        <p className="question">Question: {question}</p>
      </div>
      <div className="answer-box">
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
