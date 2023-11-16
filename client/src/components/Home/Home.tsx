import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import dest from "./images/DEST.png";
import icon from "./Group.svg";
import purpleTruck from "./images/PurpleTruck.png";
import news from "./images/Rectangle7.png";
import profileImage from "./images/Rectangle12.png";
import journey from "./images/Rectangle11.png";
import settings from "./images/Rectangle10.png";
import road from "./images/Rectangle9.png";
import coverImage from "./images/Cover.png";

function Home() {
  const navigate = useNavigate();

  const onRectangle2Click = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  return (
    <div className="desktop-3">
      <div className="mask-group" />
      <img className="image-4-icon" alt="" src={coverImage} />
      <b className="journey-awaits-find-container">
        <span className="signup-txt">
          <p className="journey-awaits">Journey Awaits:</p>
          <p className="journey-awaits"> Find Your Bus Trip</p>
        </span>
      </b>
      <div className="frame-parent">
        <div className="frame-wrapper">
          <div className="group-parent">
            <img className="group-icon" alt="" src={icon} />
            <b className="bustravel">BusTravel</b>
          </div>
        </div>
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
      <img className="desktop-3-item" alt="" src={dest} />
      <img className="desktop-3-inner" alt="" src={journey} />
      <img className="rectangle-icon" alt="" src={purpleTruck} />
      <img className="desktop-3-child1" alt="" src={settings} />
      <div className="frame-div" />
      <div className="rectangle-div" />
      <div className="footer-wrapper">
        <b className="home">FOOTER</b>
      </div>
      <img className="desktop-3-child2" alt="" src={news} />
      <div className="news-wrapper">
        <b className="home">NEWS</b>
      </div>
      <img
        className="desktop-3-child3"
        alt=""
        src={road}
        onClick={onRectangle2Click}
      />
      <img className="desktop-3-child4" alt="" src={profileImage} />
      <div className="frame-group">
        <div className="frame-wrapper">
          <b className="travel">TRAVEL</b>
        </div>
        <div className="routes-wrapper">
          <b className="routes">ROUTES</b>
        </div>
      </div>
      <div className="frame-container">
        <div className="frame-wrapper">
          <b className="profile">PROFILE</b>
        </div>
        <div className="settings-wrapper">
          <b className="profile">SETTINGS</b>
        </div>
      </div>
      <div className="destinations-parent">
        <b className="home">DESTINATIONS</b>
        <div className="your-journey-wrapper">
          <b className="home">YOUR JOURNEY</b>
        </div>
      </div>
    </div>
  );
}

export default Home;
