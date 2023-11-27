import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
interface City {
  name: string;
  subType: string;
  address: {
    countryCode: string;
    stateCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
  relationships: {
    id: string;
    type: string;
    href: string;
  }[];
}

const About: React.FC = () => {
  const [citiesInfo, setCitiesInfo] = useState<City[]>([]);
  const [location, setLocation] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [airportId, setAirportId] = useState("");

  useEffect(() => {
    if (citiesInfo.length > 0) {
      // Calculate the center and bounds based on city coordinates
      const coordinates = citiesInfo.map((city) => [
        city.geoCode.latitude,
        city.geoCode.longitude,
      ]);

      const bounds = coordinates.reduce(
        (acc, coord) => [
          Math.min(acc[0], coord[0]),
          Math.min(acc[1], coord[1]),
          Math.max(acc[2], coord[0]),
          Math.max(acc[3], coord[1]),
        ],
        [
          coordinates[0][0],
          coordinates[0][1],
          coordinates[0][0],
          coordinates[0][1],
        ]
      ) as [number, number, number, number];

      const center = [
        (bounds[0] + bounds[2]) / 2,
        (bounds[1] + bounds[3]) / 2,
      ] as [number, number];

      setMapCenter(center);
    }
  }, [citiesInfo]);

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

  const getDirectDestinations = async () => {
    const storedToken = localStorage.getItem("token");

    console.log(airportId);
    try {
      const response = await axios.get(
        "http://localhost:8081/get-direct-Destinations",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          params: { departureAirportCode: airportId },
        }
      );
      console.log(response.data);
      setAirportId("");
    } catch (error: any) {
      console.error("Error Response:", error.response);
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

  const handleAirportClick = (id: string) => {
    setAirportId(id);
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Locartion/City:
            <input
              placeholder="Example: Paris, France, Amsterdam"
              type="text"
              value={location}
              onChange={handleLocationChange}
            />
          </label>{" "}
          <label>
            Enter Country Code
            <input
              placeholder="Example: FR -> France, US -> United States"
              type="text"
              value={countryCode}
              onChange={handleCountryCodesChange}
            />
          </label>
          <button onClick={getInfo}>GET</button>
          <button onClick={getDirectDestinations}>GET 2</button>
        </form>
      </div>
      <div className="results-container">
        <div className="location-info-container">
          {citiesInfo.length > 0 ? (
            <ul>
              <h3>Information about the city</h3>
              {citiesInfo.map((city: City, index) => (
                <li key={index}>
                  <strong>{city.name}</strong> - {city.subType} in{" "}
                  {city.address.countryCode}, {city.address.stateCode} <br />
                  Latitude: {city.geoCode.latitude}, Longitude:{" "}
                  {city.geoCode.longitude} <br />
                  <span className="airports">
                    <strong>Airports:</strong>
                    {city.relationships.map((airport, i) => (
                      <div className="airport" key={i}>
                        {airport.type} -{" "}
                        <button onClick={() => handleAirportClick(airport.id)}>
                          {airport.id}
                        </button>{" "}
                        <br />
                      </div>
                    ))}
                  </span>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No City and Coutry Code provided</p>
          )}
        </div>
        <div className="map-container" style={{ height: "140vh" }}>
          {citiesInfo.length > 0 && (
            <MapContainer
              center={mapCenter}
              zoom={2}
              scrollWheelZoom={true}
              maxBoundsViscosity={1.0}
              style={{ width: "80%", height: "50%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {citiesInfo.map((city: City, index) => (
                <Marker
                  key={index}
                  position={[city.geoCode.latitude, city.geoCode.longitude]}
                >
                  <Popup>
                    <div>
                      <strong>{city.name}</strong> - {city.subType} <br />
                      Country: {city.address.countryCode}, State:{" "}
                      {city.address.stateCode} <br />
                      Latitude: {city.geoCode.latitude}, Longitude:{" "}
                      {city.geoCode.longitude}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
