import React from "react";
import "./css/hotelsStyles.css";
import HotelSearch from "./HotelSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import HotelList from "./HotelList";
import Loader from "../../Loader/Loader";
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
  const loading = useSelector(
    (state: RootState) => state.navigationHelper.isLoading
  );
  return (
    <div className="hotel-container">
      <div>
        {activeHotelSearch && <HotelSearch />}{" "}
        {activeHotelList && foundHotelsCount ? (
          <HotelList hotelList={null} />
        ) : activeHotelList && loading === true ? (
          <Loader />
        ) : null}
      </div>
    </div>
  );
};

export default Hotels;
