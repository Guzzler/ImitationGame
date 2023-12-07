import React, { useEffect, useState, useRef, useCallback } from "react";
import Typed from "react-typed";
import "./HumanPage.css";

const apiUrl = process.env.REACT_APP_API_URL;

const HumanPage = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [roundId, setRoundId] = useState("");
  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false);
  const [typedComplete, setTypedComplete] = useState(false);
  const intervalRef = useRef();
  // Placeholder functions for API calls
  async function getQuestionFromAPI() {
    // Your API call logic here
    try {
      // Assuming `apiUrl` and `difficultyConverter` are defined and available in the scope
      const response = await fetch(`${apiUrl}fetch_question`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.is_question) {
        setQuestion(data.question);
        setName(data.human);
        setRoundId(data.round_id);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error starting the game. Please try again.");
    }
  }

  async function submitAnswerToAPI(answer) {
    // Your API call logic here
    try {
      // Assuming `apiUrl` and `difficultyConverter` are defined and available in the scope
      const response = await fetch(
        `${apiUrl}save_human_response?answer=${answer}&round_id=${roundId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error starting the game. Please try again.");
    }
  }
  const fetchQuestion = useCallback(async () => {
    setIsFetchingQuestion(true);
    try {
      // Replace with your actual API call and include the `name` in the request if needed
      await getQuestionFromAPI(name);
    } catch (error) {
      console.error("Error fetching question:", error);
      // Handle error appropriately
    }
    setIsFetchingQuestion(false);
  }, [name]);

  const handleAnswerSubmit = async () => {
    // Submit the answer to the backend
    await submitAnswerToAPI(answer); // Replace with your actual API call
    setAnswer("");
    setQuestion("");
    setRoundId("");
    setName("");
    setTypedComplete(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isFetchingQuestion && !question) {
        fetchQuestion();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isFetchingQuestion, question, fetchQuestion]);

  useEffect(() => {
    if (typedComplete) {
      // When the typing is complete, clear the interval
      clearInterval(intervalRef.current);
    }
  }, [typedComplete]);
  return (
    <div className="HumanPage">
      <div>Challenger: {name}</div>
      <div className="question-box">
        <p className="question">
          {question && (
            <Typed
              strings={[question]}
              typeSpeed={40}
              onComplete={() => setTypedComplete(true)}
            />
          )}
        </p>
      </div>
      <div className="answer-box">
        <input
          type="text"
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={!typedComplete}
        />
        <button
          className="human-button"
          onClick={handleAnswerSubmit}
          disabled={
            !typedComplete || question.length === 0 || answer.trim() === ""
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HumanPage;
