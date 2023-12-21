import React from "react";
import "./css/hotelsStyles.css";
import HotelSearch from "./HotelSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import HotelList from "./HotelList";
const Hotels: React.FC = () => {
  const foundHotelsCount = useSelector(
    (state: RootState) => state.location.location.foundHotelsCount
  );
  const activeHotelSearch = useSelector(
    (state: RootState) => state.navigationHelper.isHotelSearchActive
  );
  const activeHotelList = useSelector(
    (state: RootState) => state.navigationHelper.isHotelListActive
  );
  return (
    <div className="hotel-container">
      <div>
        {activeHotelSearch && <HotelSearch />}{" "}
        {activeHotelList && foundHotelsCount && <HotelList hotelList={null} />}
      </div>
    </div>
  );
};

export default Hotels;
