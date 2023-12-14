import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff"; // Import flight icon
import DateRangeIcon from "@material-ui/icons/DateRange"; // Import date icon
import AccessTimeIcon from "@material-ui/icons/AccessTime"; // Import clock icon
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"; // Import money icon
import PersonIcon from "@material-ui/icons/Person"; // Import person icon
import "./styles.css";

interface FlightListProps {
  flightOffers: any[];
  handleFlightClick: (flight: any) => void;
  handleClearFilter: () => void;
}

const FlightList: React.FC<FlightListProps> = ({
  flightOffers,
  handleFlightClick,
  handleClearFilter,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} className="scrollContainer">
          {flightOffers.map((offer: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleFlightClick(offer)}
              key={offer.id}
              className="flightOfferCard"
            >
              <div className="infoContainer">
                <Typography variant="h6">
                  <FlightTakeoffIcon /> Flight Offer {offer.id}
                </Typography>
                <div className="flightOfferDetails">
                  <Typography variant="body1">
                    <DateRangeIcon /> Departure Date: {offer.lastTicketingDate}
                  </Typography>
                  <Typography variant="body1">
                    <AccessTimeIcon /> Duration: {offer.itineraries[0].duration}
                  </Typography>
                  <Typography variant="body1">
                    <MonetizationOnIcon /> Price: {offer.price.currency}{" "}
                    {offer.price.total}
                  </Typography>
                  <Typography variant="body1">
                    <PersonIcon /> Number of Bookable Seats:{" "}
                    {offer.numberOfBookableSeats}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          {flightOffers.length > 0 && (
            <Button
              className="clearButton"
              variant="contained"
              color="secondary"
              onClick={() => handleClearFilter()}
            >
              Clear Filters
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FlightList;
