import React, { useState } from "react";
import "./style.css";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import Travel from "../../Travel/Travel";
import Dest from "../../Dest/Dest";
import Profile from "../../Profile/Profile";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <div className="container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-register-container">
        {/* When user is logged in add => Welcome back username */}
        <div className="text-container">
          <h1>Get Started with Creating Account</h1>
          <p>Track all the destinations and get points for traveling</p>
        </div>
        <div className="buttons-container">
          <button
            style={{
              background: "#D2042D",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
            onClick={() => handleOptionClick("login")}
          >
            Login
          </button>
          <button
            style={{
              background: "blue",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
            onClick={() => handleOptionClick("register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
