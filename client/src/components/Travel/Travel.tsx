import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "./images/RoadBackgroundImage.png";
function Travel() {
  const navigate = useNavigate();
  const onTRAVELINGContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameContainerClick = useCallback(() => {
    navigate("/frame-9");
  }, [navigate]);

  return (
    <div className="desktop-2">
      <img className="image-4-icon" alt="" src={BackgroundImage} />
      <div className="traveling" onClick={onTRAVELINGContainerClick}>
        <b className="traveling1">TRAVELING</b>
      </div>
      <div className="new-travel-wrapper" onClick={onFrameContainerClick}>
        <div className="new-travel">
          <b className="traveling1">NEW TRAVEL</b>
        </div>
      </div>
      <div className="ob-formsfirst-name-parent">
        <div className="ob-formsfirst-name">
          <div className="first-name1">First Name</div>
          <div className="frame3">
            <div className="name6">First Name</div>
          </div>
        </div>
        <div className="ob-formsfirst-name">
          <div className="first-name1">Last Name</div>
          <div className="frame3">
            <div className="name6">Last Name</div>
          </div>
        </div>
        <div className="ob-formsfirst-name">
          <div className="first-name1">Age</div>
          <div className="frame3">
            <div className="name6">Age</div>
          </div>
        </div>
        <div className="ob-formscash">
          <div className="name6">Cash</div>
        </div>
        <div className="ob-formscash">
          <div className="name6">PayPal</div>
        </div>
        <div className="ob-formscash">
          <div className="name6">Credit Card</div>
        </div>
      </div>
    </div>
  );
}

export default Travel;
