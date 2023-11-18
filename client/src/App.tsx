import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Travel from "./components/Home/Travel/Travel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
    </Routes>
  );
}

export default App;
