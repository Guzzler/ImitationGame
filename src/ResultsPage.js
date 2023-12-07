import React, { useState } from "react";
import "./ResultsPage.css"; // Make sure to create and import the corresponding CSS file

const ResultsPage = ({ didWin }) => {
  const [difficultyRating, setDifficultyRating] = useState("");
  const [guessReason, setGuessReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the survey data
    console.log({ difficultyRating, guessReason, feedback });
    // Redirect or show a message after submission
  };

  const canSubmit = difficultyRating && guessReason.length > 0;

  return (
    <div className="ResultsPage">
      <h1>Your Result</h1>
      <p>
        {didWin
          ? "You guessed correctly!"
          : "Unfortunately, you were fooled by the AI model."}
      </p>
      <form onSubmit={handleSubmit} className="survey-form">
        <label>How difficult was it for you to guess?</label>
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              className={`rating-button ${
                difficultyRating === num.toString() ? "selected" : ""
              }`}
              onClick={() => setDifficultyRating(num.toString())}
            >
              {num}
            </button>
          ))}
        </div>

        <label htmlFor="guessReason">Why did you guess this way?</label>
        <input
          id="guessReason"
          type="text"
          value={guessReason}
          onChange={(e) => setGuessReason(e.target.value)}
          placeholder="Your reason"
        />

        <label htmlFor="feedback">Give us more Feedback! (Optional)</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback"
        />
        <div>
          <button type="submit" className="submit-btn" disabled={!canSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultsPage;
