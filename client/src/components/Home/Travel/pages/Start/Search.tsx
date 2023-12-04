import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { setOriginCitySliceCode } from "../../../../../app/locationSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../../../app/rootReducer";
import { format } from "date-fns";

interface City {
  city: string;
  country: string;
  state?: string;
  code: string;
}

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [originLocationCode, setOriginLocationCode] = useState<string | null>(
    null
  );

  const [destinationLocationCode, setDestinationLocationCode] = useState<
    string | null
  >(null);
  const [hotelsOption, setHotelsOption] = useState(false);
  const thisCityCode = useSelector((state: RootState) => state.location);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);
  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles({ hasSuggestions: Boolean(options.length) });
  useEffect(() => {
    console.log("City code updated: ", originLocationCode);
    dispatch(setOriginCitySliceCode(originLocationCode));
  }, [originLocationCode]);
  useEffect(() => {
    console.log("City after changes:", thisCityCode);
  }, [thisCityCode]);

  useEffect(() => {
    const fetchOriginLocationData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setLoading(true);
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
        console.log("Destinations Response data: ", response.data);
        // console.log("Origin Location Value: ", originInputValue);
        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));

        // Use the callback form to ensure you get the updated state
        setOptions((_prevOptions) => cities);
        console.log("Origin Options: ", cities);

        // Use the callback form to ensure you get the updated state
        setOriginLocationCode((prevCityCode) =>
          originInputValue.trim() !== "" ? prevCityCode : null
        );
        console.log("City code: ", originLocationCode);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
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
        setLoading(true);
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
        console.log("Destinations Response data: ", response.data);
        const locations = response.data.data;
        const cities = locations.map((location: any) => ({
          city: location.address.cityName,
          country: location.address.countryName,
          code: location.iataCode,
          state: location.address.stateCode,
        }));
        console.log("Destination Location Value: ", destinationInputValue);
        // Use the callback form to ensure you get the updated state
        setOptions((_prevOptions) => cities);
        console.log("Destination Options: ", cities);

        // Use the callback form to ensure you get the updated state
        setDestinationLocationCode((prevCityCode) =>
          destinationInputValue.trim() !== "" ? prevCityCode : null
        );
        console.log("City code: ", destinationLocationCode);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
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
    _event: React.ChangeEvent<{}>,
    value: NonNullable<string | City>,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<City> | undefined
  ) => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setOriginLocationCode(newCityCode);
      console.log("New city code: ", newCityCode);
      console.log("Origin Location Code: ", originLocationCode);
    }
  };

  const handleDestinationLocationCodeAutocompleteChange = (
    _event: React.ChangeEvent<{}>,
    value: NonNullable<string | City>,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<City> | undefined
  ) => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setDestinationLocationCode(newCityCode);
      console.log("New city code: ", newCityCode);
      console.log("Destination Location Code: ", destinationLocationCode);
    }
  };

  const currentDate = new Date(); // Get the current date
  const currentDateString = currentDate.toISOString().split("T")[0]; // Convert to string

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = new Date(inputValue);
    setDepartureDate(parsedDate);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {/* Location From Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            autoComplete
            autoHighlight
            className={classes.textInput}
            freeSolo
            disableClearable
            blurOnSelect
            clearOnBlur
            options={options}
            loading={loading}
            onChange={handleOriginLocationCodeAutocompleteChange}
            onInputChange={(_, newInputValue) =>
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
            renderInput={(props) => (
              <TextField
                {...props}
                className={classes.textInput}
                placeholder="Search"
                label="From (City)"
                variant="outlined"
                InputProps={{
                  ...props.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Location To Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            autoComplete
            autoHighlight
            className={classes.textInput}
            freeSolo
            disableClearable
            blurOnSelect
            clearOnBlur
            options={options}
            loading={loading}
            onChange={handleDestinationLocationCodeAutocompleteChange}
            onInputChange={(_, newInputValue) =>
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
            renderInput={(props) => (
              <TextField
                {...props}
                className={classes.textInput}
                placeholder="Search"
                label="To (City)"
                variant="outlined"
                InputProps={{
                  ...props.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs>
            <TextField
              type="text"
              label="Adults"
              variant="outlined"
              value={destinationLocationCode}
              onChange={(e) => {
                // Validate input to allow only numeric values
                const input = e.target.value;
                if (/^\d*$/.test(input)) {
                  setDestinationLocationCode(input);
                }
              }}
              inputProps={{ min: 1 }}
              className={`${classes.numberInput} ${classes.adultsInput}`}
            />
          </Grid>
        </Grid>
        <Grid
          className={classes.datePickerContainer}
          container
          alignItems="center"
        >
          <Grid item xs>
            <TextField
              type="date"
              label="Departure Date"
              variant="outlined"
              value={departureDate ? format(departureDate, "yyyy-MM-dd") : ""}
              onChange={handleDateChange}
              className={`${classes.datePicker} ${classes.adultsInput}`}
              inputProps={{ min: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  cityName: {
    color: "black",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    overflow: "hidden",
  },
  adultsInput: {
    backgroundColor: "rgb(0, 0, 0, 0.5)",
    "& input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    width: "100%",
  },
  numberInput: {
    width: "95%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
  },
  datePickerContainer: {
    marginTop: "10px",
  },
  datePicker: {
    width: "50%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
  },
  textInput: {
    width: "100%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733 !important",
    },
  },
}));

export default Search;
