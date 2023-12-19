import React from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import "./style.css";
const Home: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Main />
      </div>
    </div>
  );
};

export default Home;
