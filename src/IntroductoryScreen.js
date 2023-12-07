import React, { useState } from "react";
import "./IntroductoryScreen.css";
import advaithImage from "./images/advaith.jpeg";
import meghanaImage from "./images/meghana.jpeg";
import sharangImage from "./images/sharang.jpeg";
import { useNavigate } from "react-router-dom";

const IntroductoryScreen = () => {
  const [difficulty, setDifficulty] = useState("");
  const [challenger, setChallenger] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  const startGame = () => {
    if (challenger && difficulty) {
      // Navigate to /user with challenger and difficulty as query params
      navigate(`/user?challenger=${challenger}&difficulty=${difficulty}`);
    } else {
      alert("Please select both a challenger and a difficulty level.");
    }
  };

  return (
    <div className="IntroductoryScreen">
      <h2 style={{ marginBottom: "8px", marginTop: "8px" }}>
        Welcome to Turing Chat
      </h2>
      <h3 style={{ margin: "4px" }}>
        Can You Unravel the Mystery of Mind and Machine?
      </h3>

      <div className="rules-section">
        <div className="rule">
          <div className="rule">
            <h3>Set Your Challenge</h3>
            <p>
              Select a difficulty level - Easy (5 questions), Medium (3
              questions), or Hard (just 1 question).
            </p>
          </div>
          <div className="difficulty-selection">
            <button
              className={`difficulty-btn ${
                difficulty === "easy" ? "selected" : ""
              }`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`difficulty-btn ${
                difficulty === "medium" ? "selected" : ""
              }`}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`difficulty-btn ${
                difficulty === "hard" ? "selected" : ""
              }`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>
          <h3>Pick a Challenger</h3>
          <p>
            Start your adventure by choosing between Advaith, Meghana, or
            Sharang. Get ready to match wits with them!
          </p>
        </div>
        <div className="challenger-selection">
          {/* Replace with actual image URLs */}
          <div
            className={`challenger ${
              challenger === "Advaith" ? "selected" : ""
            }`}
            onClick={() => setChallenger("Advaith")}
          >
            <img src={advaithImage} alt="Advaith" />
            <p>Advaith</p>
          </div>
          <div
            className={`challenger ${
              challenger === "Meghana" ? "selected" : ""
            }`}
            onClick={() => setChallenger("Meghana")}
          >
            <img src={meghanaImage} alt="Meghana" />
            <p>Meghana</p>
          </div>
          <div
            className={`challenger ${
              challenger === "Sharang" ? "selected" : ""
            }`}
            onClick={() => setChallenger("Sharang")}
          >
            <img src={sharangImage} alt="Sharang" />
            <p>Sharang</p>
          </div>
        </div>

        <div className="rule">
          <h3>Guess Human or AI?</h3>
          <p>
            After questioning, decide which set of your responses corresponds to
            human or AI and find out!
          </p>
        </div>
      </div>

      <button
        className={`start-game-btn ${
          !challenger || !difficulty ? "start-game-disabled" : ""
        }`}
        onClick={startGame}
        disabled={!challenger || !difficulty}
      >
        Start Game
      </button>
    </div>
  );
};

export default IntroductoryScreen;
