import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import HumanPage from "./HumanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/human" element={<HumanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
