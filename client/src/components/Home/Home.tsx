import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import dest from "./images/DEST.png";
import icon from "./images/Group.svg";
import purpleTruck from "./images/PURPLETRUCK.png";
import news from "./images/NEWS.png";
import profileImage from "./images/PROFILEIMAGE.png";
import journey from "./images/JOURNEY.png";
import settings from "./images/SETTINGS.png";
import road from "./images/ROAD.png";
import coverImage from "./images/COVERIMAGE.png";

function Home() {
  const navigate = useNavigate();

  const onRectangleContainerClick = useCallback(() => {
    navigate("/travel");
  }, [navigate]);

  return (
    <div className="desktop-3">
      <div className="mask-group" />
      <div className="rectangle-parent">
        <img className="frame-child" alt="" src={coverImage} />
        <div className="frame-wrapper">
          <div className="group-parent">
            <img className="group-icon" alt="" src={icon} />
            <b className="bustravel">BusTravel</b>
            <div className="home-parent">
              <b className="home">HOME</b>
              <b className="signup">
                <span className="signup-txt">
                  <span>SIGN</span>
                  <span className="up">UP</span>
                </span>
              </b>
            </div>
          </div>
        </div>
        <b className="journey-awaits-find-container">
          <p className="journey-awaits">Journey Awaits:</p>
          <p className="journey-awaits"> Find Your Bus Trip</p>
        </b>
      </div>
      <div className="vector-parent">
        <img className="frame-item" alt="" src={dest} />
        <b className="destinations">DESTINATIONS</b>
      </div>
      <div className="vector-group">
        <img className="frame-inner" alt="" src={journey} />
        <b className="your-journey">YOUR JOURNEY</b>
      </div>
      <div className="vector-container">
        <img className="rectangle-icon" alt="" src={purpleTruck} />
        <b className="routes">ROUTES</b>
      </div>
      <div className="frame-div">
        <img className="frame-child1" alt="" src={settings} />
        <b className="settings">SETTINGS</b>
      </div>
      <div className="rectangle-group">
        <div className="rectangle-div" />
        <b className="footer">FOOTER</b>
      </div>
      <div className="rectangle-container">
        <img className="frame-child2" alt="" src={news} />
        <b className="news">NEWS</b>
      </div>
      <div className="desktop-3-inner">
        <div className="vector-parent1" onClick={onRectangleContainerClick}>
          <img className="component-child" alt="" src={road} />
          <b className="travel">TRAVEL</b>
        </div>
      </div>
      <div className="vector-parent2">
        <img className="frame-child3" alt="" src={profileImage} />
        <b className="profile">PROFILE</b>
      </div>
    </div>
  );
}

export default Home;
