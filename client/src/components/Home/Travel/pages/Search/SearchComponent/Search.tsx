import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./components/Styles";
import { useDispatch } from "react-redux";
import {
  setOriginCitySliceCode,
  setDestinationSliceCode,
} from "../../../../../../app/locationSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../../../../app/rootReducer";
import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import DateInputComponent from "./components/DateInputComponent";
import ButtonComponent from "./components/ButtonComponent";
import AutocompleteComponent from "./components/AutocompleteComponent";
import NumberInputComponent from "./components/NumberInputComponent";
import Loader from "../../../../../assets/Loader";
import FlightModal from "../FlightModal/FlightModal";
import FlightOffer from "./components/interfaces/FlightTypes";
// INTERFACES
interface City {
  city: string;
  country: string;
  state?: string;
  code: string;
}
// RESPONSE INTERFACES

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [originLocationCode, setOriginLocationCode] = useState<string | null>(
    null
  );

  const [adults, setAdults] = useState<number>(1);
  const [destinationLocationCode, setDestinationLocationCode] = useState<
    string | null
  >(null);
  const classes = useStyles();
  // const [hotelsOption, setHotelsOption] = useState(false);
  const thisCityCode = useSelector((state: RootState) => state.location);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);
  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(setOriginCitySliceCode(originLocationCode));
    dispatch(setDestinationSliceCode(destinationLocationCode));
  }, [originLocationCode, destinationLocationCode]);
  useEffect(() => {
    console.log("city code slicers after changes:", thisCityCode);
  }, [thisCityCode]);

  // Making call to find flights offers
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([]);
  useEffect(() => {
    console.log("Flight offers console log: ", flightOffers);
  }, [flightOffers]);

  const fetchFlightsOffers = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      setLoading(true);
      const formattedDate = departureDate
        ? format(departureDate, "yyyy-MM-dd")
        : null;

      const response = await axios.get(
        "http://localhost:8081/get-flight-offers",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          params: {
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: formattedDate,
            adults: adults,
          },
        }
      );
      const offers = response.data.data;
      setFlightOffers(offers);
      console.log("Response data flight offers: ", response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOriginLocationData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8081/get-origin-locations",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            params: {
              keyword: originInputValue,
            },
          }
        );
        // console.log("Origin Location Value: ", originInputValue);
        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));

        setOptions((_prevOptions) => cities);
        console.log("Origin Options: ", cities);

        setOriginLocationCode((prevCityCode) =>
          originInputValue.trim() !== "" ? prevCityCode : null
        );
        console.log("Origin City code: ", originLocationCode);
      } catch (error: any) {
        console.error(error);
      }
    };

    if (originInputValue.trim() !== "") {
      fetchOriginLocationData();
    }
  }, [originInputValue]);

  useEffect(() => {
    const fetchDestinationLocationData = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8081/get-destinations-locations",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            params: {
              keyword: destinationInputValue,
            },
          }
        );

        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));

        // Use the callback form to ensure you get the updated state
        setOptions((_prevOptions) => cities);
        console.log("Destination city code: ", destinationLocationCode);
        // Use the callback form to ensure you get the updated state
        setDestinationLocationCode((prevCityCode) =>
          destinationInputValue.trim() !== "" ? prevCityCode : null
        );
      } catch (error: any) {
        console.error(error);
      }
    };

    if (destinationInputValue.trim() !== "") {
      fetchDestinationLocationData();
    }
  }, [destinationInputValue]);

  // useEffect(() => {
  //   const fetchHotelOffers = async () => {
  //     if (originLocationCode !== null && originLocationCode !== "") {
  //       const storedToken = localStorage.getItem("token");
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:8081/getHotelOffers",
  //           {
  //             headers: { Authorization: `Bearer ${storedToken}` },
  //             params: { originLocationCode: originLocationCode },
  //           }
  //         );
  //         console.log(response.data);
  //       } catch (error: any) {
  //         // Log the detailed error information
  //         console.error("Axios Error:", error);
  //         if (error.response) {
  //           console.error("Response Data:", error.response.data);
  //           console.error("Response Status:", error.response.status);
  //         }
  //       }
  //     }
  //   };

  //   fetchHotelOffers();
  // }, [originLocationCode]);

  const handleOriginLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setOriginLocationCode(newCityCode);
      console.log("New city code: ", newCityCode);
      console.log("Origin Location Code: ", originLocationCode);
    }
  };
  const handleDestinationLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setDestinationLocationCode(newCityCode);
      console.log("New city code: ", newCityCode);
      console.log("Destination Location Code: ", destinationLocationCode);
    }
  };

  const handleDateChange = (date: Date | null): void => {
    setDepartureDate(date);
  };
  const handleClearFilter = () => {
    setOriginLocationCode(null);
    setDestinationLocationCode(null);
    setDepartureDate(null);
    setAdults(1);
    setFlightOffers([]);
  };
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(
    null
  );
  const handleFlightClick = (flight: FlightOffer) => {
    setSelectedFlight(flight);
  };

  const handleCloseFlightDetails = () => {
    setSelectedFlight(null);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {loading ? (
          <Loader />
        ) : flightOffers.length === 0 ? (
          <>
            <Grid item xs={12} sm={6}>
              <AutocompleteComponent
                options={options}
                loading={loading}
                value={originInputValue}
                onChange={(value) =>
                  handleOriginLocationCodeAutocompleteChange(
                    value as NonNullable<string | City>
                  )
                }
                onInputChange={(newInputValue) =>
                  setOriginInputValue(newInputValue)
                }
                getOptionLabel={(option: City) => option.city || ""}
                renderOption={(option: City) => (
                  <Grid container alignItems="center">
                    <Grid item>
                      <FontAwesomeIcon icon={faSearch} />
                    </Grid>
                    <Grid item xs>
                      <span className={classes.cityName}>{option.city}</span>
                      <Typography variant="body2" color="textSecondary">
                        {option.country}
                        {option.state ? `, ${option.state}` : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                label="From (City)"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AutocompleteComponent
                options={options}
                loading={loading}
                value={destinationInputValue}
                onChange={(value) =>
                  handleDestinationLocationCodeAutocompleteChange(
                    value as NonNullable<string | City>
                  )
                }
                onInputChange={(newInputValue) =>
                  setDestinationInputValue(newInputValue)
                }
                getOptionLabel={(option: City) => option.city || ""}
                renderOption={(option: City) => (
                  <Grid container alignItems="center">
                    <Grid item>
                      <FontAwesomeIcon icon={faSearch} />
                    </Grid>
                    <Grid item xs>
                      <span className={classes.cityName}>{option.city}</span>
                      <Typography variant="body2" color="textSecondary">
                        {option.country}
                        {option.state ? `, ${option.state}` : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                label="To (City)"
              />
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.datePickerContainer}
            >
              <Grid item xs>
                <NumberInputComponent
                  value={adults}
                  onChange={setAdults}
                  label="Adults"
                />
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs className={classes.datePickerContainer}>
                <DateInputComponent
                  value={departureDate}
                  onChange={(date) => handleDateChange(date)}
                  label="Departure Date"
                />
              </Grid>
            </Grid>
            {departureDate && originLocationCode && destinationLocationCode ? (
              <Grid item xs>
                <ButtonComponent onClick={fetchFlightsOffers} />
              </Grid>
            ) : null}
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} className={classes.scrollContainer}>
                  {flightOffers.map((offer) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      onClick={() => handleFlightClick(offer)}
                      key={offer.id}
                      className={classes.flightOfferCard}
                    >
                      <Typography variant="h6">
                        Flight Offer {offer.id}
                      </Typography>
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
        )}
      </Grid>
      {selectedFlight && (
        <FlightModal
          flight={selectedFlight}
          onClose={handleCloseFlightDetails}
        />
      )}
    </div>
  );
};

export default Search;
