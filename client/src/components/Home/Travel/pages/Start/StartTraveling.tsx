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

const StartTraveling: React.FC = () => {
  const [citiesInfo, setCitiesInfo] = useState<City[]>([]);
  const [location, setLocation] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [mapBounds, setMapBounds] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
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
      setMapBounds(bounds);
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
    <div className="main-container">
      <div className="form-container">
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
            Enter Country Code for Your Destination
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
      <div className="results-container">
        <div className="location-info-container">
          <ul>
            {citiesInfo.map((city: City, index) => (
              <li key={index}>
                <strong>{city.name}</strong> - {city.subType} in{" "}
                {city.address.countryCode}, {city.address.stateCode} <br />
                Latitude: {city.geoCode.latitude}, Longitude:{" "}
                {city.geoCode.longitude} <br />
                Airports:{" "}
                {city.relationships.map((airport, i) => (
                  <span key={i}>
                    {airport.type} - {airport.id} <br />
                  </span>
                ))}
                <hr />
              </li>
            ))}
          </ul>
        </div>
        <div className="map-container" style={{ height: "150vh" }}>
          {citiesInfo.length > 0 && (
            <MapContainer
              center={mapCenter}
              zoom={2}
              scrollWheelZoom={true}
              maxBoundsViscosity={1.0}
              style={{ width: "30%", height: "30%" }}
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

export default StartTraveling;
