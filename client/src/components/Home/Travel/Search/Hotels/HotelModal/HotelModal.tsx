import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../app/rootReducer";

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

const HotelModal: React.FC = () => {
  const [hotelList, setHotelList] = useState<Hotel[]>([]);
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
    console.log("Destination City Code: ", destinationCityCode);
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
      setHotelList(response.data.data);
      console.log("Hotel List: ", hotelList);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div>
      <button onClick={getHotelList}>GET</button>
    </div>
  );
};

export default HotelModal;
