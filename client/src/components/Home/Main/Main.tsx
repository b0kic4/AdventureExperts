import React, { useState, useRef } from "react";
import "./style.css";
import { Parallax } from "react-parallax";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Travel from "../Travel/Travel";
import Dest from "../Dest/Dest";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import imageForTraveling from "../assets/pexels-pixabay-414916.jpg";
import DestinationImage from "../Dest/assets/natures-beauty-reflected-tranquil-mountain-waters-generative-ai.jpg";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

const Main = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);

  const handleGetStartedClick = () => {
    if (travelRef.current) {
      travelRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCloseClick = () => {
    setShowRegistrationForm(false);
    setShowLoginForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm((prev) => !prev);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegistrationForm(false);
  };

  return (
    <div className="container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-register-container">
        <div className="text-container">
          <h1>Get Started with Your Bus Account</h1>
          <p>Get The Most Out Of Traveling</p>
        </div>
        <div className="buttons-container">
          <button
            style={{
              background: "#D2042D",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            style={{
              background: "blue",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
        {showRegistrationForm && <Register onClose={handleCloseClick} />}
        {showLoginForm && <Login onClose={handleCloseClick} />}
        {!showRegistrationForm && !showLoginForm && (
          <div className="traveling">
            <button onClick={handleGetStartedClick}>
              Get Started With Traveling
            </button>
          </div>
        )}
      </div>
      <div className="get-started-container" ref={travelRef}>
        <div className="paralax-content">
          <Parallax strength={600} bgImage={imageForTraveling}>
            <Travel />
          </Parallax>
        </div>
      </div>
      <div className="destinations-container">
        <div className="paralax-content">
          <Parallax strength={600} bgImage={DestinationImage}>
            <Dest />
          </Parallax>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Main;
