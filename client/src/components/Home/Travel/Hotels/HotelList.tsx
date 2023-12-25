import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Icons
import HotelIcon from "@mui/icons-material/Hotel";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import SpaIcon from "@mui/icons-material/Spa";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PetsIcon from "@mui/icons-material/Pets";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import KitchenIcon from "@mui/icons-material/Kitchen";
import NatureIcon from "@mui/icons-material/Nature";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CasinoIcon from "@mui/icons-material/Casino";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import HotTubIcon from "@mui/icons-material/HotTub";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import NoDrinksIcon from "@mui/icons-material/NoDrinks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarRateIcon from "@mui/icons-material/StarRate";

import "./css/hotelListStyles.css";
import HotelResponse, { Hotel } from "./assets/interfaces/Hotel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import { setHotelListSlice } from "../../../../app/hotelListSlice";
import { toast } from "react-toastify";
import {
  setIsHotelListActive,
  setIsHotelSearchActive,
} from "../../../../app/Helpers";
import HotelModal from "./HotelModal/HotelModal";
import MainSearch from "./MainSearch";

interface HotelListProps {
  hotelList: HotelResponse | null;
}

export const amenityIcons: { [key: string]: React.ReactElement } = {
  SWIMMING_POOL: <PoolIcon />,
  SPA: <SpaIcon />,
  FITNESS_CENTER: <FitnessCenterIcon />,
  AIR_CONDITIONING: <AcUnitIcon />,
  RESTAURANT: <RestaurantIcon />,
  PARKING: <LocalParkingIcon />,
  PETS_ALLOWED: <PetsIcon />,
  AIRPORT_SHUTTLE: <AirportShuttleIcon />,
  BUSINESS_CENTER: <BusinessCenterIcon />,
  DISABLED_FACILITIES: <AccessibilityIcon />,
  WIFI: <WifiIcon />,
  MEETING_ROOMS: <MeetingRoomIcon />,
  NO_KID_ALLOWED: <ChildFriendlyIcon />,
  TENNIS: <SportsTennisIcon />,
  GOLF: <SportsGolfIcon />,
  KITCHEN: <KitchenIcon />,
  ANIMAL_WATCHING: <NatureIcon />,
  BABY_SITTING: <ChildCareIcon />,
  BEACH: <BeachAccessIcon />,
  CASINO: <CasinoIcon />,
  JACUZZI: <HotTubIcon />,
  SAUNA: <AcUnitIcon />,
  SOLARIUM: <WbSunnyIcon />,
  MASSAGE: <HotTubIcon />,
  VALET_PARKING: <LocalParkingIcon />,
  "BAR or LOUNGE": <LocalBarIcon />,
  KIDS_WELCOME: <ChildFriendlyIcon />,
  NO_PORN_FILMS: <NoDrinksIcon />,
  MINIBAR: <LocalBarIcon />,
  TELEVISION: <WbSunnyIcon />,
  WI_FI_IN_ROOM: <WifiIcon />,
  ROOM_SERVICE: <RoomServiceIcon />,
  GUARDED_PARKG: <LocalParkingIcon />,
  SERV_SPEC_MENU: <MenuBookIcon />,
};

const HotelList: React.FC<HotelListProps> = () => {
  const dispatch = useDispatch();
  const hotelList = useSelector(
    (state: RootState) => state.hotelList.hotelList
  );
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!hotelList || hotelList.data.length === 0) {
    function handleClearFilter(): void {
      dispatch(setHotelListSlice(null));
      dispatch(setIsHotelListActive(false));
      dispatch(setIsHotelSearchActive(true));
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs>
          <Button
            className="clearButton"
            variant="contained"
            color="secondary"
            onClick={() => handleClearFilter()}
          >
            Clear Results
          </Button>
        </Grid>
      </Grid>
    );
  }

  function handleClearFilter(): void {
    dispatch(setHotelListSlice(null));
    dispatch(setIsHotelListActive(false));
    dispatch(setIsHotelSearchActive(true));
    toast.success("Results Cleared");
  }

  function handleHotelClick(hotel: Hotel): void {
    setHotel(hotel);
    setIsModalOpen(true);
  }

  const onClose = () => {
    setHotel(null);
    setIsModalOpen(false);
  };
  return (
    <>
      {hotelList && hotel === null ? (
        <>
          <Grid
            container
            spacing={2}
            className={`scrollContainer ${isModalOpen ? "blurred" : ""}`}
          >
            {hotelList.data.map((hotel) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={hotel.hotelId}
                className="hotelOfferCard"
                onClick={() => handleHotelClick(hotel)}
              >
                <div className="infoContainer">
                  <Typography variant="h6">
                    <HotelIcon /> {hotel.name}
                  </Typography>
                  <div className="hotelOfferDetails">
                    <Typography variant="body1">
                      {hotel.amenities.map((amenity: any) => (
                        <React.Fragment key={amenity}>
                          {amenityIcons[amenity]} {amenity}
                        </React.Fragment>
                      ))}
                    </Typography>
                    <Typography variant="body1">
                      <p>
                        {" "}
                        <StarRateIcon />
                        {hotel.rating}
                      </p>
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              {hotelList.data.length > 0 && (
                <Button
                  className="clearButton"
                  variant="contained"
                  color="secondary"
                  onClick={handleClearFilter}
                >
                  Clear Results
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      ) : hotelList === null || (hotelList === null && hotel === null) ? (
        <MainSearch />
      ) : hotelList && hotel ? (
        <HotelModal hotel={hotel} onClose={onClose} />
      ) : null}
    </>
  );
};
export default HotelList;
