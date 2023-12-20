import React from "react";
import useStyles from "./hotelListStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
// import { RootState } from "../../../../app/rootReducer";
import {
  setIsHotelListActive,
  setIsHotelSearchActive,
} from "../../../../app/helpers";

const HotelList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goBackToSearch = () => {
    dispatch(setIsHotelListActive(false));
    dispatch(setIsHotelSearchActive(true));
  };
  return (
    <div className={classes.scrollContainer}>
      <div className={classes.headerContainer}>
        <button className={classes.goBackButton} onClick={goBackToSearch}>
          <ArrowBackIcon fontSize="large" />
          <p>Back</p>
        </button>
      </div>
    </div>
  );
};

export default HotelList;
