import React from "react";
import { Parallax, Background } from "react-parallax";
import "./style.css";
import startTravelingImage from "./assets/writing-map-near-tourist-supplies.jpg";
import scheduleImage from "./assets/map-lying-wooden-table.jpg";
import learnMoreImage from "./assets/view-hands-holding-smartphone.jpg";

const Travel = () => {
  return (
    <div className="container">
      <div className="travel-items">
        <div className="start-traveling">
          <button>
            <img src={startTravelingImage} alt="" />
            <h1>START TRAVELING TODAY</h1>
            <p>Explore new destinations and create unforgettable memories.</p>
          </button>
        </div>
        <div className="schedule-traveling">
          <button>
            <img src={scheduleImage} alt="" />
            <h1>SCHEDULE TRAVELING</h1>
            <p>
              Book your travel, set the dates, and embark on a seamless
              adventure
            </p>
          </button>
        </div>
        <div className="more-about-traveling">
          <button>
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
