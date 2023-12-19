import React from "react";
import "./css/styles.css";
import HotelSearch from "./HotelSearch";
const HotelList: React.FC = () => {
  return (
    <div className="hotel-container">
      <div>
        <HotelSearch />
      </div>
    </div>
  );
};

export default HotelList;
