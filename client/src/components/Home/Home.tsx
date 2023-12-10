import React from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import "./style.css";
function Home() {
  return (
    <div className="container home-page">
      <Navbar />
      <Main />
    </div>
  );
}

export default Home;
