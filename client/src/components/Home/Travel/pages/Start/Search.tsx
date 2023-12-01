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

interface City {
  city: string;
  country: string;
  state?: string;
  code: string;
}

// interface SearchProps {
//   onCityCodeChange: (newCityCode: City | string | null) => void;
// }
// <SearchProps>
const Search: React.FC = () => {
  const [cityCode, setCityCode] = useState<City | string | null>(null);
  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles({ hasSuggestions: Boolean(options.length) });
  useEffect(() => {
    console.log("City code updated: ", cityCode);
  }, [cityCode]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8081/get-locations",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            params: {
              keyword: inputValue,
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
        console.log("Options: ", cities);

        // Use the callback form to ensure you get the updated state
        setCityCode((prevCityCode) =>
          inputValue.trim() !== "" ? prevCityCode : null
        );
        console.log("City code: ", cityCode);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue.trim() !== "") {
      fetchData();
    }
  }, [inputValue]);

  const handleAutocompleteChange = (
    _event: React.ChangeEvent<{}>,
    value: NonNullable<string | City>,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<City> | undefined
  ) => {
    if (value) {
      const newCityCode = typeof value === "string" ? value : value.code || "";
      setCityCode(newCityCode);
      console.log("New city code: ", newCityCode);
    }
  };

  return (
    <div className={classes.container}>
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
        onChange={handleAutocompleteChange}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
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
            label="City"
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
    alignContent: "center",
  },
  textInput: {
    width: "40%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      // color: "#FF5733", // Set your desired input text color
      backgroundColor: "rgb(0, 0, 0, 0.5)", // Set the background color
    },
    "& .MuiInputLabel-root": {
      color: "white", // Set your desired label text color
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733", // Set the border color to match the text color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733", // Set the hover border color
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF5733", // Set the focused border color
    },
  },
  girdContainer: {
    border: "1px solid black",
  },
}));

export default Search;
