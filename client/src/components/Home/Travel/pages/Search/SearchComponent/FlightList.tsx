import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface FlightListProps {
  flightOffers: any[];
  classes: Record<string, string>;
  handleFlightClick: (flight: any) => void;
  handleClearFilter: () => void;
}

const FlightList: React.FC<FlightListProps> = ({
  flightOffers,
  classes,
  handleFlightClick,
  handleClearFilter,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} className={classes.scrollContainer}>
          {flightOffers.map((offer: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleFlightClick(offer)}
              key={offer.id}
              className={classes.flightOfferCard}
            >
              <Typography variant="h6">Flight Offer {offer.id}</Typography>
              <Typography variant="body2">
                Departure Date: {offer.lastTicketingDate}
              </Typography>
              <Typography variant="body2">
                Duration: {offer.itineraries[0].duration}
              </Typography>
              <Typography variant="body2">
                Price: {offer.price.currency} {offer.price.total}
              </Typography>
              <Typography variant="body2">
                Number of Bookable Seats: {offer.numberOfBookableSeats}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          {flightOffers.length > 0 && (
            <Button
              className={classes.clearButton}
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
