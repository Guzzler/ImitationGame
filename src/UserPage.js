import React, { useEffect, useState } from "react";
import "./UserPage.css"; // Updated CSS file for new styles
import { useSearchParams } from "react-router-dom";
import Typed from "react-typed";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const UserPage = () => {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty") || "None";
  const challenger = searchParams.get("challenger") || "None";
  const gameId = searchParams.get("gameId") || "None";

  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState({ A: [], B: [] });
  const [isFetching, setIsFetching] = useState(false);

  const [remainingQuestions, setRemainingQuestions] = useState(() => {
    switch (difficulty) {
      case "easy":
        return 5;
      case "medium":
        return 3;
      case "hard":
        return 1;
      default:
        return 0;
    }
  });

  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate("/");
  };

  useEffect(() => {
    if (difficulty === "easy") {
      setRemainingQuestions(5);
    } else if (difficulty === "medium") {
      setRemainingQuestions(3);
    } else {
      setRemainingQuestions(1);
    }
  }, [difficulty]);

  const handleQuestionSubmit = async () => {
    if (remainingQuestions > 0 && question !== "") {
      if (gameId && question) {
        try {
          setResponses((prevResponses) => ({
            A: [...prevResponses.A, { text: question, type: "question" }],
            B: [...prevResponses.B, { text: question, type: "question" }],
          }));

          setIsFetching(true);
          // Assuming `apiUrl` and `difficultyConverter` are defined and available in the scope
          const response = await fetch(
            `${apiUrl}fetch_responses?game_id=${encodeURIComponent(
              gameId
            )}&question=${encodeURIComponent(question)}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // Check if the returned data has a gameId
          if (data.response_a && data.response_b) {
            setResponses((prevResponses) => ({
              A: [
                ...prevResponses.A,
                { text: data.response_a, type: "response" },
              ],
              B: [
                ...prevResponses.B,
                { text: data.response_b, type: "response" },
              ],
            }));
            setQuestion("");
            setIsFetching(false);
            setRemainingQuestions(remainingQuestions - 1);
          } else {
            throw new Error("Game ID not found");
          }
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
          alert("There was an error sending the message. Please try again.");
        }
      } else {
        alert("Please type a question.");
      }
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [askingConfirmation, setAskingConfirmation] = useState(false);

  const handleSelectResponse = (responseType) => {
    setSelectedOption(responseType);
    setAskingConfirmation(true);
  };

  const confirmSelection = async (response_type) => {
    try {
      const guess = response_type === "B" ? "True" : "False";
      // Assuming `apiUrl` and `difficultyConverter` are defined and available in the scope
      const response = await fetch(
        `${apiUrl}check_guess?guess=${guess}&game_id=${gameId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Check if the returned data has a gameId
      navigate(`/results?didWin=${data.win}&gameId=${gameId}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error starting the game. Please try again.");
    }
  };

  const cancelSelection = () => {
    setSelectedOption(null);
    setAskingConfirmation(false);
  };

  const renderResponse = (response) => {
    if (response.type === "question") {
      return (
        <div className="question-bubble">
          <Typed showCursor={false} strings={[response.text]} typeSpeed={40} />
        </div>
      );
    } else if (response.type === "response") {
      return (
        <div className="response-bubble">
          <Typed showCursor={false} strings={[response.text]} typeSpeed={40} />
        </div>
      );
    }
  };

  useEffect(() => {
    const handleCancel = (e) => {
      if (e.key === "Escape") {
        cancelSelection();
      }
    };

    if (askingConfirmation) {
      window.addEventListener("keydown", handleCancel);
      window.addEventListener("click", handleCancel);
    }

    return () => {
      window.removeEventListener("keydown", handleCancel);
      window.removeEventListener("click", handleCancel);
    };
  }, [askingConfirmation]);

  return (
    <div className="UserPage">
      <h2 className="page-title">Turing Chat Challenge</h2>
      <div className="game-info">
        <div className="info-item">
          <span className="info-label">Difficulty</span>
          <span className="info-value">{difficulty}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Challenger</span>
          <span className="info-value">{challenger}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Questions Remaining</span>
          <span className="info-value">{remainingQuestions}</span>
        </div>
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder={
            remainingQuestions !== 0
              ? "Ask a question..."
              : "No more questions, Make your guess!"
          }
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleQuestionSubmit();
            }
          }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={
            difficulty === "None" ||
            challenger === "None" ||
            remainingQuestions === 0
          }
        />
        <button
          className="send-btn"
          onClick={handleQuestionSubmit}
          disabled={
            difficulty === "None" ||
            challenger === "None" ||
            isFetching ||
            remainingQuestions === 0 ||
            question.length === 0
          }
        >
          Send
        </button>
      </div>
      <div className="responses-area">
        <div className="response">
          <div className="response-label">Response A:</div>
          <div className="response-text">
            {responses.A.map(renderResponse)}
            {isFetching && (
              <div className="waiting for response">
                Waiting for response...
              </div>
            )}
          </div>
          <button
            className={`select-btn ${selectedOption === "A" ? "selected" : ""}`}
            onClick={() => {
              if (selectedOption === "A") {
                confirmSelection("A");
              } else {
                handleSelectResponse("A");
              }
            }}
          >
            {askingConfirmation && selectedOption === "A"
              ? "Are you sure?"
              : `Select A as ${challenger}`}
          </button>
        </div>
        <div className="response">
          <div className="response-label">Response B:</div>
          <div className="response-text">
            {responses.B.map(renderResponse)}
            {isFetching && <div>Waiting for response...</div>}
          </div>
          <button
            className={`select-btn ${selectedOption === "B" ? "selected" : ""}`}
            onClick={() => {
              if (selectedOption === "B") {
                confirmSelection("B");
              } else {
                handleSelectResponse("B");
              }
            }}
          >
            {askingConfirmation && selectedOption === "B"
              ? "Are you sure?"
              : `Select B as ${challenger}`}
          </button>
        </div>
      </div>
      <button className="new-game-btn" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
};

export default UserPage;
