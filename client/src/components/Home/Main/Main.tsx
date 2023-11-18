import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import Travel from "../Travel/Travel";
import imageForTraveling from "../assets/pexels-pixabay-414916.jpg";
import { Parallax } from "react-parallax";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const threshold = 100;
    setVisible(scrollY > threshold);
  };

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
    setShowLoginForm(false); // Close login form if open
  };

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegistrationForm(false); // Close registration form if open
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
        {showRegistrationForm && (
          <div
            className={`registration-form ${
              showRegistrationForm ? "active" : ""
            }`}
          >
            <button
              style={{
                background: "transparent",
                color: "black",
                fontSize: "32px",
              }}
              className="close-button"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <form>
              <label>
                Full Name:
                <input type="name" />
              </label>{" "}
              <label>
                Username:
                <input type="text" />
              </label>{" "}
              <label>
                Email
                <input type="email" />
              </label>
              <label>
                Password:
                <input type="password" />
              </label>
              <label>
                Confirm Password:
                <input type="password" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {showLoginForm && (
          <div className={`registration-form ${showLoginForm ? "active" : ""}`}>
            <button
              style={{
                background: "transparent",
                color: "black",
                fontSize: "32px",
              }}
              className="close-button"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <form>
              <label>
                Username:
                <input type="text" />
              </label>
              <label>
                Password:
                <input type="password" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
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
      <div></div>
    </div>
  );
};

export default Main;
