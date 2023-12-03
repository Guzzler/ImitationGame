import React, { useState } from "react";
import "./UserPage.css"; // Make sure to create this CSS file and define styles

const UserPage = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState({ ai: "", human: "" });
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleQuestionSubmit = async () => {
    // Here you would send the question to your backend and receive the responses
    // This is just a placeholder to simulate the process
    const aiResponse = "AI Response";
    const humanResponse = "Human Response";
    setResponses({ ai: aiResponse, human: humanResponse });
  };

  const handleResponseSelection = (responseType) => {
    setSelectedResponse(responseType);
    // Here you would send the selected response type to your backend to check if correct
    // This is a placeholder for the actual logic
    const correctAnswer = "human"; // Placeholder
    setIsCorrect(responseType === correctAnswer);
  };

  return (
    <div className="user-page">
      <div className="question-section">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleQuestionSubmit}>Send</button>
      </div>
      <div className="response-section">
        <div>
          <div className="response">Response A (AI): {responses.ai}</div>
          <button onClick={() => handleResponseSelection("ai")}>
            Select A
          </button>
        </div>
        <div>
          <div className="response">Response B (Human): {responses.human}</div>
          <button onClick={() => handleResponseSelection("human")}>
            Select B
          </button>
        </div>
      </div>
      {selectedResponse && (
        <div className="result-section">
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}
    </div>
  );
};

export default UserPage;
