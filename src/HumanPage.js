import React, { useEffect, useState, useRef, useCallback } from "react";
import Typed from "react-typed";
import { useSearchParams } from "react-router-dom";
import "./HumanPage.css";

const HumanPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "None";
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false);
  const [typedComplete, setTypedComplete] = useState(false);
  const intervalRef = useRef();
  // Placeholder functions for API calls
  async function getQuestionFromAPI(name) {
    // Your API call logic here
    return "What's your favourite colour?";
  }

  async function submitAnswerToAPI(answer) {
    // Your API call logic here
    console.log("Answer submitted:", answer);
  }
  const fetchQuestion = useCallback(async () => {
    setIsFetchingQuestion(true);
    try {
      // Replace with your actual API call and include the `name` in the request if needed
      const response = await getQuestionFromAPI(name);
      setQuestion(response);
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
          onClick={handleAnswerSubmit}
          disabled={!typedComplete || answer.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HumanPage;
