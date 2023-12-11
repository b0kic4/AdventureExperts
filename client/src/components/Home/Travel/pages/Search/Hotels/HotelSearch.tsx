import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../app/rootReducer";
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
  const [hotelList, setHotelList] = useState<Hotel[]>([]);

  const [radius, setRadius] = useState<number>(5);
  const [radiusUnit, setRadiusUnit] = useState<"KM" | "MILE">("KM");
  //Array of hotel chain codes. Each code is a string consisted of 2 capital alphabetic characters.
  const [chainCodes, setChainCodes] = useState<string[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [ratings, setRatings] = useState<number[]>([]);
  const [hotelSource, setHotelSource] = useState<string[]>([]);

  const handleRatingChange = (selectedRating: number) => {
    if (!ratings.includes(selectedRating) && ratings.length < 4) {
      setRatings((prevRatings) => [...prevRatings, selectedRating]);
    } else {
      toast.error("Select up to four ratings");
    }
  };
  const handleRemoveRating = (removedRating: number) => {
    setRatings((prevRatings) =>
      prevRatings.filter((rating) => rating !== removedRating)
    );
  };

  const handleAmenityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedAmenities(event.target.value as string[]);
  };

  const handleClearAmenities = () => {
    setSelectedAmenities([]);
  };

  const destinationCityCode = useSelector(
    (state: RootState) => state.location.location.destinationCityCode
  );

  useEffect(() => {
    if (
      destinationCityCode &&
      destinationCityCode != null &&
      destinationCityCode != "NaN"
    ) {
      getHotelList();
    }
  }, [destinationCityCode]);

  const getHotelList = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get<HotelResponse>(
        "http://localhost:8081/get-hotel-list",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          params: {
            cityCode: destinationCityCode,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const hotels = response.data.data;
      setHotelList(hotels);
      console.log("Hotel List: ", hotelList);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  const handleFormSubmit = (ev: any) => {
    ev.preventDefault;
    return null;
  };
  return (
    <div className={classes.formContainer}>
      <label className={classes.formLabel}>Radius Unit:</label>
      <select
        value={radiusUnit}
        onChange={(e) => setRadiusUnit(e.target.value as "KM" | "MILE")}
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
        onChange={(e) => setRadius(Number(e.target.value))}
        className={classes.formInput}
      />
      <label className={classes.formLabel}>Chain Codes - Optional:</label>
      <input
        type="text"
        value={chainCodes.join(",")}
        onChange={(e) => setChainCodes(e.target.value.split(","))}
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
        <Button onClick={handleClearAmenities} className={classes.clearButton}>
          Clear Amenities
        </Button>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="ratings-label">Select Ratings - Optional:</InputLabel>
        <Select
          labelId="ratings-label"
          id="ratings"
          multiple
          value={ratings}
          onChange={(e) => handleRatingChange(e.target.value as number)}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as number[]).map((value) => (
                <Chip
                  key={value}
                  label={`Rating ${value}`}
                  onDelete={() => handleRemoveRating(value)}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <MenuItem key={rating} value={rating}>
              {`Rating ${rating}`}
            </MenuItem>
          ))}
        </Select>
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

      <button
        onClick={handleFormSubmit}
        type="submit"
        className={classes.formButton}
      >
        Search
      </button>
    </div>
  );
};

export default HotelSearch;
