import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Travel from "./components/Home/Travel/Travel";
import Search from "./components/Home/Travel/Search/Search";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  // Define a function to handle city code changes
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
