// Import necessary types
import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import Travel from "../../Travel/Travel";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type

  const handleOptionClick = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const threshold = 100;
    setVisible(scrollY > threshold);
  };

  const handleGetStartedClick = () => {
    if (travelRef.current) {
      (travelRef.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-register-container">
        <div className="text-container">
          <h1>Get Started with Your Bus Account</h1>
          <p>With Account track Your Journey and get many more options</p>
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
        <div className="traveling">
          <button onClick={handleGetStartedClick}>
            <p>Get Started With Traveling</p>
          </button>
        </div>
      </div>
      <div className="get-started-container" ref={travelRef}>
        <Travel />
      </div>
    </div>
  );
};

export default Main;
