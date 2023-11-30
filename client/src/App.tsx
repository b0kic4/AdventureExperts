import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Travel from "./components/Home/Travel/Travel";
import Search from "./components/Home/Travel/pages/Start/Search";
import Schedule from "./components/Home/Travel/pages/Schedule/Schedule";
import About from "./components/Home/Travel/pages/About/About";

function App() {
  const [cityCode, setCityCode] = useState<string | null>(null); // Set the initial type of cityCode

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
      <Route
        path="/search"
        element={<Search cityCode={cityCode} setCityCode={setCityCode} />}
      />
      <Route path="/schedule-traveling" element={<Schedule />} />
      <Route path="/about-traveling" element={<About />} />
    </Routes>
  );
}

export default App;
