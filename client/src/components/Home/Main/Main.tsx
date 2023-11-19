import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import Travel from "../Travel/Travel";
import imageForTraveling from "../assets/pexels-pixabay-414916.jpg";
import DestinationImage from "../Dest/assets/natures-beauty-reflected-tranquil-mountain-waters-generative-ai.jpg";
import { Parallax } from "react-parallax";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Dest from "../Dest/Dest";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);
  // Form values
  // REGISTER VALUES
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputRegistrationChange = (name: string, value: string) => {
    // You can update the state based on the input name
    switch (name) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  // LOGIN VALUES
  const [loginEmailOrUsername, setLoginEmailOrUsername] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const handleInputLoginChange = (name: string, value: string) => {
    // You can update the state based on the input name
    switch (name) {
      case "loginEmailorUsername":
        setLoginEmailOrUsername(value);
        break;
      case "loginPw":
        setLoginPw(value);
        break;
      default:
        break;
    }
  };

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
  const handleRegisterSubmit = async (ev: any) => {
    ev.prevent.Default();
    try {
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }
      // Send registration data to backend
      const response = await axios.post("http://localhost:8081/register", {
        name: name,
        username: username,
        email: email,
        password: password,
      });

      // Handle successful registration (you can redirect or show a success message)
      console.log("Registration successful", response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const errorData = error.response.data;
        if (errorData.message === "Invalid password") {
          alert("Invalid password");
        }
      } else if (error.request) {
        alert("User not found");
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegistrationForm(false); // Close registration form if open
  };

  const handleLoginSubmit = async (ev: any) => {
    ev.preventDefault();
    try {
      // Send login data to backend
      const response = await axios.post("http://localhost:8081/login", {
        emailOrUsername: loginEmailOrUsername,
        password: loginPw,
      });

      // Handle successful login (you can redirect or show a success message)
      console.log("Login successful", response.data);
    } catch (error: any) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Login failed:", error.response.data.error);
      } else {
        console.error("Error during login:", error.message);
      }

      // You can set an error state and display an error message to the user
    }
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
                <input
                  type="name"
                  value={name}
                  onChange={(e) =>
                    handleInputRegistrationChange("name", e.target.value)
                  }
                />
              </label>{" "}
              <label>
                Username:
                <input
                  type="name"
                  value={username}
                  onChange={(e) =>
                    handleInputRegistrationChange("username", e.target.value)
                  }
                />
              </label>{" "}
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    handleInputRegistrationChange("email", e.target.value)
                  }
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    handleInputRegistrationChange("password", e.target.value)
                  }
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    handleInputRegistrationChange(
                      "confirmPassword",
                      e.target.value
                    )
                  }
                />
              </label>
              <button onClick={handleRegisterSubmit} type="submit">
                Submit
              </button>
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
                Email or Username:
                <input
                  type="text"
                  value={loginEmailOrUsername}
                  onChange={(e) =>
                    handleInputLoginChange(
                      "loginEmailorUsername",
                      e.target.value
                    )
                  }
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={loginPw}
                  onChange={(e) =>
                    handleInputLoginChange("loginPw", e.target.value)
                  }
                />
              </label>
              <button onClick={handleLoginSubmit} type="submit">
                Submit
              </button>
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
      <div className="desinations-container">
        <div className="paralax-content">
          <Parallax strength={600} bgImage={DestinationImage}>
            <Dest />
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default Main;
