// MainSearch component
import React from "react";
import HotelSearch from "./HotelSearch";
import useStyles from "./mainSearchStyles";

const MainSearch: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.responsiveContainer}>
        <div className={classes.hotelSearchContainer}>
          <HotelSearch />
        </div>
        {/* <div className={classes.offersSearchContainer}>
          <OffersSearch />
        </div> */}
      </div>
    </div>
  );
};

export default MainSearch;
