import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
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

interface SearchProps {
  setCityCode: (code: string) => void;
  cityCode: string | null;
}

const Search: React.FC<SearchProps> = ({ cityCode, setCityCode }) => {
  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles({ hasSuggestions: Boolean(options.length) });

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
  };
  useEffect(() => {
    console.log("City Code: ", cityCode);
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
        // Based on response data for location is in response.data.data
        const locations = response.data.data; // Extract the locations array
        const cities = locations.map(
          // Mapping location with address from response that has properties of:
          // cityName, countryName, stateCode, regionCode, countryCode
          (location: {
            address: { cityName: any; countryName: any; stateCode: any };
            iataCode: any;
          }) => ({
            city: location.address.cityName,
            country: location.address.countryName,
            code: location.iataCode,
            state: location.address.stateCode,
          })
        );
        setOptions(cities);
        console.log("Options: ", options);
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
        onChange={(_event, newValue) => {
          console.log("Before setCityCode in Search: ", cityCode);
          const newCityCode = (newValue as City)?.code || "";
          console.log("new CityCode: ", newCityCode);
          setCityCode(newCityCode);
          console.log("City Code after setCityCode: ", cityCode);
        }}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        getOptionLabel={(option: City) => option.city || ""}
        renderOption={(option: City) => (
          // Displaying container on searching
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
