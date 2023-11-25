import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const StartTraveling: React.FC = () => {
  const [citiesInfo, setCitiesInfo] = useState([]);
  const [location, setLocation] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    console.log("Cities Info Updated:", citiesInfo);
  }, [citiesInfo, countryCode]);

  const getInfo = async () => {
    const storedToken = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8081/get-cities", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        params: {
          location: location,
          countryCode: countryCode,
        },
      });
      console.log(response.data);
      console.log("Country Code:", countryCode);
      setCitiesInfo(response.data);
    } catch (error: any) {
      console.error("Error Response:", error.response);

      if (error.response) {
        console.log("Error Response Data:", error.response.data);
      } else {
        console.log("Error occurred:", error);
      }
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handleCountryCodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Location:", location);
    // console.log("Submitted Country Codes: ", coutryCode);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Destination/Location:
          <input
            placeholder="Example: Paris, France, Amsterdam"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </label>{" "}
        <label>
          Enter Coutry Code for Your Destination
          <input
            placeholder="Example: FR -> France, US -> United States"
            type="text"
            value={countryCode}
            onChange={handleCountryCodesChange}
          />
        </label>
      </form>
      <button onClick={getInfo}>GET</button>
    </div>
  );
};

export default StartTraveling;
