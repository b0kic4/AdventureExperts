import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setOriginCitySliceCode,
  setDestinationSliceCode,
} from "../../../../app/locationSlice";

import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import DateInputComponent from "./components/DateInputComponent";
import ButtonComponent from "./components/ButtonComponent";
import AutocompleteComponent from "./components/AutocompleteComponent";
import NumberInputComponent from "./components/NumberInputComponent";
import Loader from "../../Loader/Loader";
import FlightModal from "../Flights/FlightModal/FlightModal";
import FlightOffer from "./components/interfaces/FlightTypes";
import FlightList from "../Flights/FlightList";
import Hotels from "../Hotels/Hotels";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { RootState } from "../../../../app/rootReducer";
// import {
//   setIsHotelListActive,
//   setIsHotelSearchActive,
// } from "../../../../app/helpers";
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
  // Location Codes
  const [originLocationCode, setOriginLocationCode] = useState<string | null>(
    null
  );
  const [destinationLocationCode, setDestinationLocationCode] = useState<
    string | null
  >(null);
  // Params
  const [dictionaries, setDictionaries] = useState<[]>([]);

  const [adults, setAdults] = useState<number>(() => {
    const savedAdults = localStorage.getItem("adults");
    return savedAdults ? parseInt(savedAdults, 10) : 1;
  });
  useEffect(() => {
    const savedAdults = localStorage.getItem("adults");
    if (savedAdults) {
      setAdults(parseInt(savedAdults, 10));
    }
  }, []);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  useEffect(() => {
    const savedDepartureDate = localStorage.getItem("departureDate");
    if (savedDepartureDate) {
      setDepartureDate(new Date(savedDepartureDate));
    }
  }, []);

  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);

  // Styles
  const classes = useStyles();

  // Input values
  const [originInputValue, setOriginInputValue] = useState<string>(String);
  const [destinationInputValue, setDestinationInputValue] =
    useState<string>(String);
  const [savedOriginInputValue, setSavedOriginInputValue] =
    useState<City | null>(null);
  const [savedDestInputValue, setSavedDestInputValue] = useState<City | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  // Setting location codes to redux slice
  useEffect(() => {
    dispatch(setOriginCitySliceCode(originLocationCode));
    dispatch(setDestinationSliceCode(destinationLocationCode));
  }, [originLocationCode, destinationLocationCode]);

  // Making call to find flights offers
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([]);
  // useEffect(() => {
  //   console.log("Flight offers console log: ", flightOffers);
  // }, [flightOffers]);

  const [activeButton, setActiveButton] = useState<"flights" | "hotels">(
    "flights"
  );

  const handleButtonClick = (buttonType: "flights" | "hotels") => {
    setActiveButton(buttonType);
  };

  const fetchFlightsOffers = async (ev: any) => {
    ev.preventDefault;
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
      const responseData = response.data;
      const dict = responseData.dictionaries;
      setDictionaries(dict);

      // console.log("Offers: ", offers);
      // console.log("Response data flight offers: ", response.data);
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

        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));
        // console.log("Cities in origin: ", cities);
        // console.log("Locations in origin: ", locations);

        setOptions(cities);

        setOriginLocationCode((prevCityCode) =>
          originInputValue.trim() !== "" ? prevCityCode : null
        );
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
        // console.log("Cities in destination: ", cities);
        // console.log("Locations in destination: ", locations);
        setOptions(cities);
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

  const handleOriginLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      // Update state
      setSavedOriginInputValue(value as City);

      // Update local storage
      localStorage.setItem("originInputValue", JSON.stringify(value));

      const newCityCode = typeof value === "string" ? value : value.code || "";
      console.log("Origin New City Code: " + newCityCode);
      if (originLocationCode !== null) {
        localStorage.setItem("originLocationCode", newCityCode);
        setOriginLocationCode(newCityCode);
      }
    }
  };

  const handleDestinationLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      // Update state
      setSavedDestInputValue(value as City); // Ensure value is treated as City

      // Update local storage
      localStorage.setItem("destinationInputValue", JSON.stringify(value));

      const newCityCode = typeof value === "string" ? value : value.code || "";
      console.log("Destination New City Code: ", newCityCode);
      if (destinationLocationCode !== null) {
        localStorage.setItem("destinationLocationCode", newCityCode);
        setDestinationLocationCode(newCityCode);
      }
    }
  };

  useEffect(() => {
    const savedOriginInputValueString =
      localStorage.getItem("originInputValue");
    const savedDestInputValueString = localStorage.getItem(
      "destinationInputValue"
    );

    if (savedOriginInputValueString) {
      const savedOriginInputValueParsed = JSON.parse(
        savedOriginInputValueString
      );
      setSavedOriginInputValue(savedOriginInputValueParsed);
    }

    if (savedDestInputValueString) {
      const savedDestInputValueParsed = JSON.parse(savedDestInputValueString);
      setSavedDestInputValue(savedDestInputValueParsed);
    }
  }, []);

  useEffect(() => {
    console.log("Origin Location Code: " + originLocationCode);
    console.log("Destination location code: ", destinationLocationCode);
  }, [originLocationCode, destinationLocationCode]);

  const handleDateChange = (date: Date | null): void => {
    setDepartureDate(date);
  };
  // useEffect(() => {
  //   dispatch(setOriginCitySliceCode(null));
  //   dispatch(setDestinationSliceCode(null));
  //   localStorage.removeItem("originLocationCode");
  //   localStorage.removeItem("destinationLocationCode");
  // }, []);
  const handleClearFilter = () => {
    setOriginLocationCode(null);
    setDestinationLocationCode(null);
    setDepartureDate(null);
    setAdults(1);
    setFlightOffers([]);
    dispatch(setOriginCitySliceCode(null));
    dispatch(setDestinationSliceCode(null));
    localStorage.removeItem("originLocationCode");
    localStorage.removeItem("destinationLocationCode");
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
  useEffect(() => {
    // Retrieve values from local storage

    const savedOriginLocationCode = localStorage.getItem("originLocationCode");
    const savedDestinationLocationCode = localStorage.getItem(
      "destinationLocationCode"
    );

    // Set the retrieved values as default values for Autocomplete inputs
    setOriginLocationCode(savedOriginLocationCode);
    setDestinationLocationCode(savedDestinationLocationCode);
  }, []);

  useEffect(() => {
    // Retrieve values from local storage and set as default values
    const savedOriginInputValue = localStorage.getItem("originInputValue");
    const savedDestinationInputValue = localStorage.getItem(
      "destinationInputValue"
    );

    if (savedOriginInputValue !== null) {
      setOriginInputValue(savedOriginInputValue);
    }

    if (savedDestinationInputValue !== null) {
      setDestinationInputValue(savedDestinationInputValue);
    }
  }, [setOriginInputValue, setDestinationInputValue]);

  // Drop down menu for Hotels

  // const [hotelDropdownAnchor, setHotelDropdownAnchor] =
  //   useState<HTMLElement | null>(null);

  // const handleHotelButtonClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setHotelDropdownAnchor(event.currentTarget);
  // };

  // const handleCloseHotelDropdown = () => {
  //   setHotelDropdownAnchor(null);
  // };

  // const handleHotelOptionClick = (option: string) => {
  //   if (option === "filters") {
  //     // Handle Filters option click
  //     dispatch(setIsHotelListActive(false));
  //     dispatch(setIsHotelSearchActive(true));
  //   } else if (option === "list") {
  //     // Handle List option click
  //     dispatch(setIsHotelListActive(true));
  //     dispatch(setIsHotelSearchActive(false));
  //   }
  //   handleCloseHotelDropdown();
  // };

  useEffect(() => {
    return () => {
      dispatch(setOriginCitySliceCode(null));
      dispatch(setDestinationSliceCode(null));
      setOriginLocationCode(null);
      setDestinationLocationCode(null);
      setDepartureDate(null);
      localStorage.removeItem("originLocationCode");
      localStorage.removeItem("destinationLocationCode");
      localStorage.removeItem("departureDate");
    };
  }, [dispatch, setDestinationLocationCode, setDepartureDate]);

  const isFlightListActive = useSelector(
    (state: RootState) => state.navigationHelper.isFlightListActive
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={classes.mainContainer}>
      <div
        className={`${classes.buttonContainer} ${
          isMobile ? classes.buttonContainerMobile : ""
        }`}
      >
        <Button
          variant={activeButton === "flights" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleButtonClick("flights")}
        >
          Flight Offers
        </Button>
        <Button
          variant={activeButton === "hotels" ? "contained" : "outlined"}
          color="inherit"
          onClick={() => handleButtonClick("hotels")}
        >
          Hotels
        </Button>
      </div>
      <div
        className={`${classes.container} ${
          isFlightListActive ? classes.flightListActiveContainer : ""
        }`}
      >
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
                  savedInputValue={savedOriginInputValue}
                  label={"From (City)"}
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
                  savedInputValue={savedDestInputValue}
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
                    max={9}
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
              {departureDate &&
              originLocationCode &&
              destinationLocationCode ? (
                <Grid item xs>
                  <ButtonComponent onClick={fetchFlightsOffers} />
                </Grid>
              ) : null}
            </>
          ) : (
            <Grid container>
              {activeButton === "flights" ? (
                <FlightList
                  flightOffers={flightOffers}
                  handleFlightClick={handleFlightClick}
                  handleClearFilter={handleClearFilter}
                />
              ) : activeButton === "hotels" ? (
                <Hotels />
              ) : (
                <FlightList
                  flightOffers={flightOffers}
                  handleFlightClick={handleFlightClick}
                  handleClearFilter={handleClearFilter}
                />
              )}
            </Grid>
          )}
        </Grid>
        {selectedFlight && activeButton === "flights" ? (
          <FlightModal
            flight={selectedFlight}
            dictionaries={dictionaries}
            onClose={handleCloseFlightDetails}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
