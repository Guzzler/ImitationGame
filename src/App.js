import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import HumanPage from "./HumanPage";
import IntroductoryScreen from "./IntroductoryScreen";
import ResultPage from "./ResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroductoryScreen />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/human" element={<HumanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
