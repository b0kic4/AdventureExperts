import React from "react";
import { Parallax, Background } from "react-parallax";
import "./style.css";
import { useNavigate } from "react-router-dom";
import startTravelingImage from "./assets/writing-map-near-tourist-supplies.jpg";
import scheduleImage from "./assets/map-lying-wooden-table.jpg";
import learnMoreImage from "./assets/view-hands-holding-smartphone.jpg";

const Travel = () => {
  const navigate = useNavigate();
  const goToStartTraveling = () => {
    navigate("/search");
  };
  const goToSchedule = () => {
    navigate("/schedule-traveling");
  };
  const goToAbout = () => {
    navigate("/about-traveling");
  };
  return (
    <div className="container">
      <div className="travel-items">
        <div className="start-traveling">
          <button onClick={goToStartTraveling}>
            <img src={startTravelingImage} alt="" />
            <h1>START TRAVELING TODAY</h1>
            <p>Explore new destinations and create unforgettable memories.</p>
          </button>
        </div>
        <div className="schedule-traveling">
          <button onClick={goToSchedule}>
            <img src={scheduleImage} alt="" />
            <h1>SCHEDULE TRAVELING</h1>
            <p>
              Book your travel, set the dates, and embark on a seamless
              adventure
            </p>
          </button>
        </div>
        <div className="more-about-traveling">
          <button onClick={goToAbout}>
            <img src={learnMoreImage} alt="" />
            <h1>MORE ABOUT TRAVELING</h1>
            <p>
              Explore our guides to make the most out of your travel experience
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Travel;
