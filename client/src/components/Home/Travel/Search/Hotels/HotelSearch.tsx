import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/rootReducer";
import {
  setRadius as setRadiusAction,
  setRadiusUnit as setRadiusUnitAction,
  setAmenities as setAmenitiesAction,
  setRatings as setRatingsAction,
  loadFiltersFromLocalStorage,
  saveFiltersToLocalStorage,
  removeSavedFilters,
} from "../../../../../app/filtersSlice";

import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Address {
  countryCode: string;
}

interface Distance {
  value: number;
  unit: string;
}

interface Hotel {
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: GeoCode;
  address: Address;
  distance: Distance;
}

interface Meta {
  count: number;
  links: {
    self: string;
  };
}

interface HotelResponse {
  data: Hotel[];
  meta: Meta;
}

const amenitiesOptions = [
  "SWIMMING_POOL",
  "SPA",
  "FITNESS_CENTER",
  "AIR_CONDITIONING",
  "RESTAURANT",
  "PARKING",
  "PETS_ALLOWED",
  "AIRPORT_SHUTTLE",
  "BUSINESS_CENTER",
  "DISABLED_FACILITIES",
  "WIFI",
  "MEETING_ROOMS",
  "NO_KID_ALLOWED",
  "TENNIS",
  "GOLF",
  "KITCHEN",
  "ANIMAL_WATCHING",
  "BABY-SITTING",
  "BEACH",
  "CASINO",
  "JACUZZI",
  "SAUNA",
  "SOLARIUM",
  "MASSAGE",
  "VALET_PARKING",
  "BAR or LOUNGE",
  "KIDS_WELCOME",
  "NO_PORN_FILMS",
  "MINIBAR",
  "TELEVISION",
  "WI-FI_IN_ROOM",
  "ROOM_SERVICE",
  "GUARDED_PARKG",
  "SERV_SPEC_MENU",
];

const HotelSearch: React.FC = () => {
  const classes = useStyles();
  const [hotelList, setHotelList] = useState<HotelResponse | null>(null);
  const dispatch = useDispatch();

  const [radius, setRadius] = useState<number>(5);
  const [radiusUnit, setRadiusUnit] = useState<"KM" | "MILE">("KM");
  //Array of hotel chain codes. Each code is a string consisted of 2 capital alphabetic characters.

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [ratings, setRatings] = useState<string[]>([]);
  const [hotelSource, setHotelSource] = useState<string[]>([]);

  const handleRatingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedRatings = event.target.value as string[];

    if (selectedRatings.length > 4) {
      toast.error("Select up to four ratings");
    } else {
      if (Array.isArray(selectedRatings)) {
        const selectedRatingsArray = selectedRatings.map(String);
        setRatings(selectedRatingsArray);
        dispatch(setRatingsAction(ratings));
      } else {
        toast.error("Invalid ratings");
      }
    }
  };

  const handleClearRatings = () => {
    setRatings([]);
    dispatch(setRatingsAction([]));
  };

  const handleAmenityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value;

    if (Array.isArray(selectedValue)) {
      // Ensure that selectedValue is an array of strings
      const selectedAmenitiesArray = selectedValue.map(String);
      setSelectedAmenities(selectedAmenitiesArray);
      dispatch(setAmenitiesAction(selectedAmenitiesArray)); // Fix this line
    } else {
      // Handle the case where selectedValue is not an array
      console.error("Invalid value for selected amenities:", selectedValue);
    }
  };

  const handleClearAmenities = () => {
    setSelectedAmenities([]);
    dispatch(setAmenitiesAction([]));
  };
  useEffect(() => {
    console.log("Hotel List: ", hotelList);
  }, [hotelList]);
  // REDUX
  const destinationCityCode = useSelector(
    (state: RootState) => state.location.location.destinationCityCode
  );
  const radiusAction = useSelector(
    (state: RootState) => state.filters.filters.radius
  );
  const radiusUnitAction = useSelector(
    (state: RootState) => state.filters.filters.radiusUnit
  );
  const amenitiesAction = useSelector(
    (state: RootState) => state.filters.filters.Amenities
  );
  const ratingsAction = useSelector(
    (state: RootState) => state.filters.filters.Ratings
  );
  const getHotelList = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (
        radiusAction &&
        radiusUnitAction &&
        amenitiesAction &&
        ratingsAction &&
        destinationCityCode &&
        radius !== radiusAction &&
        selectedAmenities.length <= 0 &&
        ratings.length <= 0
      ) {
        try {
          const response = await axios.get<HotelResponse>(
            "http://localhost:8081/get-hotel-list",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
              params: {
                cityCode: destinationCityCode,
                radius: radiusAction,
                radiusUnit: radiusUnitAction,
                amenities: amenitiesAction.join(","),
                ratings: ratingsAction.join(","),
              },
              withCredentials: true,
            }
          );
          console.log("Response Data: ", response.data);
          const hotels = response.data;
          setHotelList(hotels);
          console.log("Hotel List: ", hotelList);
        } catch (error: any) {
          console.log("Error Response Data: ", error.response?.data);
          console.log("Error Status: ", error.response?.status);
          console.log("Error Headers: ", error.response?.headers);
          console.log("Error Request: ", error.request);
          console.log("Error Message: ", error.message);
          console.log("Error Config: ", error.config);
        }
      } else {
        try {
          const response = await axios.get<HotelResponse>(
            "http://localhost:8081/get-hotel-list",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
              params: {
                cityCode: destinationCityCode,
                radius: radius,
                radiusUnit: radiusUnit,
                amenities: selectedAmenities.join(","),
                ratings: ratings.join(","),
              },
              withCredentials: true,
            }
          );

          console.log("Response Data: ", response.data);
          const hotels = response.data;
          setHotelList(hotels);
        } catch (error: any) {
          console.log("Error Response Data: ", error.response?.data);
          console.log("Error Status: ", error.response?.status);
          console.log("Error Headers: ", error.response?.headers);
          console.log("Error Request: ", error.request);
          console.log("Error Message: ", error.message);
          console.log("Error Config: ", error.config);
        }
      }
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const handleFormSubmit = (ev: any) => {
    ev.preventDefault(); // Add parentheses to invoke the function
    getHotelList();
  };
  const handleUseSavedFilters = (index: number) => {
    const savedFilterSet = savedFilters[index];

    // Dispatch actions to apply the saved filters
    dispatch(setRadiusAction(savedFilterSet.radius));
    dispatch(setRadiusUnitAction(savedFilterSet.radiusUnit));
    dispatch(setAmenitiesAction(savedFilterSet.Amenities));
    dispatch(setRatingsAction(savedFilterSet.Ratings));

    // Optionally, you might want to fetch the hotel list with the applied filters
    getHotelList();
  };
  const handleRemoveSavedFilters = (index: number) => {
    // Remove the saved filters at the provided index
    dispatch(removeSavedFilters(index));
  };
  const savedFilters = useSelector(
    (state: RootState) => state.filters.savedFilters.filterSets
  );
  const handleSaveFilters = () => {
    // Dispatch an action to save the current filters to localStorage
    dispatch(saveFiltersToLocalStorage());
  };
  useEffect(() => {
    // Load saved filters from localStorage when the component mounts
    dispatch(loadFiltersFromLocalStorage());
  }, [dispatch]);
  return (
    <div className={classes.formContainer}>
      <label className={classes.formLabel}>
        Radius Unit: - Default Unit of 5
      </label>
      <select
        value={radiusUnit}
        onChange={(e) => {
          setRadiusUnit(e.target.value as "KM" | "MILE");
          dispatch(setRadiusUnitAction(e.target.value as "KM" | "MILE"));
        }}
        className={classes.formSelect}
      >
        <option value="KM">KM</option>
        <option value="MILE">MILE</option>
      </select>
      <label className={classes.formLabel}>Radius:</label>
      <input
        type="number"
        value={radius}
        required
        onChange={(e) => {
          setRadius(Number(e.target.value));
          dispatch(setRadiusAction(Number(e.target.value)));
        }}
        className={classes.formInput}
      />

      <label className={classes.formLabel}>City Code:</label>
      <input
        type="text"
        value={destinationCityCode ?? ""}
        disabled
        className={classes.formTextInput}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="amenities-label">Select Amenities</InputLabel>
        <Select
          labelId="amenities-label"
          id="amenities"
          multiple
          required
          value={selectedAmenities}
          onChange={handleAmenityChange}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {amenitiesOptions.map((amenity) => (
            <MenuItem key={amenity} value={amenity}>
              {amenity}
            </MenuItem>
          ))}
        </Select>
        <Button
          className={classes.buttonTextStyle}
          onClick={handleClearAmenities}
        >
          Clear Filters
        </Button>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="ratings-label">Hotel Stars - Optional:</InputLabel>
        <Select
          labelId="ratings-label"
          id="ratings"
          multiple
          value={ratings}
          onChange={handleRatingChange}
          renderValue={() => (
            <div className={classes.chips}>
              {ratings.map((value) => (
                <Chip
                  key={value}
                  label={`Stars ${value}`}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <MenuItem key={rating} value={String(rating)}>
              {`Stars ${rating}`}
            </MenuItem>
          ))}
        </Select>
        <Button
          className={classes.buttonTextStyle}
          onClick={handleClearRatings}
        >
          Clear Ratings
        </Button>
      </FormControl>
      <label className={classes.formLabel}>Hotel Source:</label>
      <select
        value={hotelSource.join(",")}
        onChange={(e) => setHotelSource(e.target.value.split(","))}
        className={classes.formSelect}
      >
        <option value="ALL">All</option>
        <option value="BEDBANK">Bedbank</option>
        <option value="DIRECTCHAIN">Direct Chain</option>
      </select>
      <div>
        <button
          onClick={handleFormSubmit}
          type="submit"
          className={classes.formButton}
        >
          FIND
        </button>
        <Button className={classes.buttonTextStyle} onClick={handleSaveFilters}>
          Save Filters
        </Button>
        {savedFilters.length > 0 && (
          <div>
            {savedFilters.map((filterSet, index) => (
              <div key={index} className={classes.savedFiltersContainer}>
                <p>Saved Filters {index + 1}</p>
                <Button
                  className={classes.buttonTextStyle}
                  onClick={() => handleUseSavedFilters(index)}
                >
                  Use
                </Button>
                <Button
                  className={classes.buttonTextStyle}
                  onClick={() => handleRemoveSavedFilters(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
