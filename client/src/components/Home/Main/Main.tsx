import React, { useState, useRef, useEffect } from "react";
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
import { clearUser, setUser } from "../../../app/userSlice";
import { RootState } from "../../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: number;
  username: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const Main: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const destRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const setUserFromToken = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const decodedToken: DecodedToken = jwtDecode(storedToken);
          if (decodedToken) {
            const { userId, username, name, email, exp } = decodedToken;

            // Check if the token has not expired
            if (exp * 1000 > Date.now()) {
              dispatch(
                setUser({
                  id: userId,
                  name: name,
                  token: storedToken,
                  email: email,
                  username: username,
                })
              );
            } else {
              dispatch(clearUser());
              localStorage.removeItem("token");
              toast.warning("Your session has expired. Please log in again.");
            }
          } else {
            return;
          }
        } catch (error: any) {
          // Handle any decoding errors
          console.error("Error decoding token:", error);
        }
      }
    };

    setUserFromToken();
  }, [dispatch]);

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
    localStorage.removeItem("token");
  };

  return (
    <div className="container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-register-container">
        <div className="text-container">
          {!user.user?.username ? <h1>Get Started</h1> : <h1>Welcome back!</h1>}

          <p>Get The Most Out Of Traveling</p>
        </div>
        <div className="buttons-container">
          {!user.user?.username ? (
            <div>
              <button className="login-button" onClick={handleLoginClick}>
                Login
              </button>
              <button className="register-button" onClick={handleRegisterClick}>
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
          renderLayer={() => <div className="container-renderLayer" />}
        >
          <h1>TRAVELING</h1>

          <Travel />
        </Parallax>
      </div>
      <div className="destinations-container" ref={destRef}>
        <div className="paralax-content">
          <Parallax strength={600} bgImage={DestinationImage}>
            <h1>DESTINATIONS</h1>
            <Dest />
          </Parallax>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Main;
