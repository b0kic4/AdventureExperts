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
import FlightModal from "../Flights/FlightModal/FlightModal";
import FlightOffer from "./components/interfaces/FlightTypes";
import FlightList from "../Flights/FlightList";
import HotelList from "../Hotels/HotelList";
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
  const [dictionaries, setDictionaries] = useState<[]>([]);
  const [adults, setAdults] = useState<number>(1);
  const [destinationLocationCode, setDestinationLocationCode] = useState<
    string | null
  >(null);
  const classes = useStyles();

  // const thisCityCode = useSelector((state: RootState) => state.location);

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
  // useEffect(() => {
  //   console.log("city code slicers after changes:", thisCityCode);
  // }, [thisCityCode]);

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
        // console.log("Origin Location Value: ", originInputValue);
        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));

        setOptions((_prevOptions) => cities);
        // console.log("Origin Options: ", cities);

        setOriginLocationCode((prevCityCode) =>
          originInputValue.trim() !== "" ? prevCityCode : null
        );
        // console.log("Origin City code: ", originLocationCode);
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
        // console.log("Destination city code: ", destinationLocationCode);
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

  const handleOriginLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setOriginLocationCode(newCityCode);
      // console.log("New city code: ", newCityCode);
      // console.log("Origin Location Code: ", originLocationCode);
    }
  };
  const handleDestinationLocationCodeAutocompleteChange = (
    value: NonNullable<string | City>
  ): void => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setDestinationLocationCode(newCityCode);
      // console.log("New city code: ", newCityCode);
      // console.log("Destination Location Code: ", destinationLocationCode);
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
    <div className={classes.mainContainer}>
      <div className={classes.buttonContainer}>
        <Button
          className={`${classes.flightButton} ${
            activeButton === "flights" ? "" : classes.inactiveButton
          }`}
          onClick={() => handleButtonClick("flights")}
        >
          Flight Offers
        </Button>

        <Button
          className={`${classes.hotelButton} ${
            activeButton === "hotels" ? "" : classes.inactiveButton
          }`}
          onClick={() => handleButtonClick("hotels")}
        >
          Hotels
        </Button>
      </div>
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
                <HotelList />
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
