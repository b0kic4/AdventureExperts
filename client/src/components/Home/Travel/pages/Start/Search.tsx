import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles"; // Import makeStyles

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

const Search: React.FC<SearchProps> = ({ setCityCode }) => {
  const [options, setOptions] = useState<City[]>([
    { city: "", country: "", code: "", state: "" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles(); // Add this line to define classes

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

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
      } catch (error) {
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
    <div>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo
        disableClearable
        blurOnSelect
        clearOnBlur
        options={options}
        loading={loading}
        onChange={(event, newValue) => {
          setCityCode((newValue as City)?.code || "");
        }}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
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
  // Define your styles here
  cityName: {
    color: "black",
    fontWeight: "bold",
  },
}));

export default Search;
