import React, { useState } from "react";
import "./ResultsPage.css"; // Make sure to create and import the corresponding CSS file
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const ResultsPage = () => {
  const [difficultyRating, setDifficultyRating] = useState("");
  const [guessReason, setGuessReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize useHistory

  const didWin = searchParams.get("didWin");
  const gameId = searchParams.get("gameId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming `apiUrl` and `difficultyConverter` are defined and available in the scope
      const response = await fetch(
        `${apiUrl}feedback?difficulty=${encodeURIComponent(
          difficultyRating
        )}&reason=${encodeURIComponent(
          guessReason
        )}&comment=${feedback}&game_id=${gameId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Check if the returned data has a gameId
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error starting the game. Please try again.");
    }
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
        <select
          id="guessReason"
          value={guessReason}
          onChange={(e) => setGuessReason(e.target.value)}
        >
          <option value="">Select your reason</option>
          <option value="style">The Style</option>
          <option value="recalling-facts">Recalling Facts</option>
          <option value="grammar-coherence">Grammar / Coherence</option>
          <option value="other">Other</option>
        </select>

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
