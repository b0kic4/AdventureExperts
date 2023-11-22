import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Travel from "./components/Home/Travel/Travel";
import StartTraveling from "./components/Home/Travel/pages/Start/StartTraveling";
import Schedule from "./components/Home/Travel/pages/Schedule/Schedule";
import About from "./components/Home/Travel/pages/About/About";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/start-traveling" element={<StartTraveling />} />
      <Route path="/schedule-traveling" element={<Schedule />} />
      <Route path="/about-traveling" element={<About />} />
    </Routes>
  );
}

export default App;
