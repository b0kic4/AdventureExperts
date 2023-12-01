import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Travel from "./components/Home/Travel/Travel";
import Search from "./components/Home/Travel/pages/Start/Search";
import Schedule from "./components/Home/Travel/pages/Schedule/Schedule";
import About from "./components/Home/Travel/pages/About/About";

interface City {
  city: string;
  country: string;
  state?: string;
  code: string;
}

function App() {
  // Define a function to handle city code changes

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/search" element={<Search />} />
      <Route path="/schedule-traveling" element={<Schedule />} />
      <Route path="/about-traveling" element={<About />} />
    </Routes>
  );
}

export default App;
