import React, { useState, useRef } from "react";
import "./style.css";
import { Parallax } from "react-parallax";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Travel from "../Travel/Travel";
import Dest from "../Dest/Dest";
import backgroundVideo from "../assets/pexels_videos_1851190 (2160p).mp4";
import imageForTraveling from "../assets/pexels-pixabay-414916.jpg";
import DestinationImage from "../Dest/assets/pexels-eberhard-grossgasteiger-572897.jpg";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearUser } from "../../../app/userSlice";
import { RootState } from "../../../app/rootReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Main: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const destRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const handleGetStartedClick = () => {
    if (travelRef.current) {
      travelRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const handleGetStartedDestinationsClick = () => {
    if (destRef.current) {
      destRef.current.scrollIntoView({
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
  const handleLogOutClick = () => {
    dispatch(clearUser());
    toast.success("Successfully logged out", {
      style: {
        background: "#d2042d",
        color: "whitesmoke",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-register-container">
        <div className="text-container">
          {!user.user?.username ? (
            <h1>Get Started with Your Bus Account</h1>
          ) : (
            <h1>Welcome back!</h1>
          )}

          <p>Get The Most Out Of Traveling</p>
        </div>
        <div className="buttons-container">
          {!user.user?.username ? (
            <div>
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
              </button>{" "}
            </div>
          ) : (
            <div className="logged-container">
              <p>Logged in as: {user.user?.username}</p>
              <button onClick={handleLogOutClick} className="logout-button">
                Log out
              </button>
            </div>
          )}
        </div>
        {showRegistrationForm && <Register onClose={handleCloseClick} />}
        {showLoginForm && <Login onClose={handleCloseClick} />}
        {!showRegistrationForm && !showLoginForm && (
          <div className="traveling">
            <button
              className="button-traveling"
              onClick={handleGetStartedClick}
            >
              Get Started With Traveling
            </button>
            <button
              className="button-destinations"
              onClick={handleGetStartedDestinationsClick}
            >
              Get Started with Destinations
            </button>
          </div>
        )}
      </div>
      <div className="get-started-container" ref={travelRef}>
        <Parallax
          strength={600}
          bgImage={imageForTraveling}
          renderLayer={(percentage) => (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: `rgba(0, 0, 0, ${0.2 + percentage * 0.4})`, // Adjust the opacity by changing the last value
              }}
            />
          )}
        >
          <Travel />
        </Parallax>
      </div>
      <div className="destinations-container" ref={destRef}>
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
