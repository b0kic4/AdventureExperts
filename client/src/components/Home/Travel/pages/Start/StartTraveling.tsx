import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const StartTraveling = () => {
  const [citiesInfo, setCitiesInfo] = useState([]);

  useEffect(() => {
    // This effect will run when citiesInfo is updated
    console.log("Cities Info Updated:", citiesInfo);
  }, [citiesInfo]); // Add citiesInfo as a dependency

  const getInfo = async () => {
    const storedToken = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8081/start-traveling",
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(response.data);
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

  return (
    <div>
      <button onClick={getInfo}>GET</button>
    </div>
  );
};

export default StartTraveling;
