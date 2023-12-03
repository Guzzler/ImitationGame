import React, { useState } from "react";
import "./UserPage.css"; // Make sure to create this CSS file and define styles

const UserPage = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState({ ai: "", human: "" });

  const handleQuestionSubmit = () => {
    // Placeholder for submitting question
  };

  const handleSelectResponse = (responseType) => {
    // Placeholder for handling response selection
  };

  return (
    <div className="UserPage">
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleQuestionSubmit}>Send</button>
      </div>
      <div className="responses-area">
        <div className="response">
          <div className="response-label">Response A (AI):</div>
          <div className="response-text">
            {responses.ai || "Waiting for response..."}
          </div>
          <button onClick={() => handleSelectResponse("ai")}>Select A</button>
        </div>
        <div className="response">
          <div className="response-label">Response B (Human):</div>
          <div className="response-text">
            {responses.human || "Waiting for response..."}
          </div>
          <button onClick={() => handleSelectResponse("human")}>
            Select B
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
