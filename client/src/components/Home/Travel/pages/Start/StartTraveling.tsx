import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Loader from "../../../../assets/Loader";
import "./style.css";
import "leaflet/dist/leaflet.css";
interface Flight {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Array<Record<string, unknown>>;
  price: {
    currency: string;
    total: string;
    base: string;
    fees: Array<unknown>;
    grandTotal: string;
    additionalServices: Array<unknown>;
  };
  pricingOptions: {
    fareType: Array<unknown>;
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: Array<string>;
  travelerPricings: Array<Record<string, unknown>>;
}

const StartTraveling: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [airportId, setAirportId] = useState("");
  const [loading, setLoading] = useState(false);

  const getInfo = async () => {
    const storedToken = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8081/get-flight-offers",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },

          params: {
            originLocationCode: startLocation,
            destinationLocationCode: endLocation,
            departureDate: departureDate,
            adults: adults,
          },
        }
      );
      console.log(response.data);
      setFlights(response.data);
    } catch (error: any) {
      console.error("Error Response:", error.response);

      if (error.response) {
        console.log("Error Response Data:", error.response.data);
      } else {
        console.log("Error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Submitted Country Codes: ", coutryCode);
  };
  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    setDepartureDate(getCurrentDate());
  }, []);

  const formContainerProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const resultsContainerProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const flightCardsContainerProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const flightCardProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 500 },
  });

  return (
    <div className="main-container">
      <animated.div className="form-container" style={formContainerProps}>
        <form onSubmit={handleSubmit}>
          <label>
            City or Airport IATA code from which the traveler will depart:
            <input
              placeholder="e.g. BOS for Boston"
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </label>{" "}
          <label>
            City or Airport IATA code to which the traveler is going
            <input
              placeholder=", e.g. PAR for Paris"
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </label>{" "}
          <label>
            Date on which the traveler will depart from the origin to go to the
            destination.
            <input
              placeholder={departureDate}
              type="text"
              value={departureDate}
              readOnly
            />
          </label>{" "}
          <label>
            Number of adult travelers
            <input
              placeholder="Age 12 or older on date of departure"
              type="text"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </label>
          <button onClick={getInfo}>GET</button>
        </form>
      </animated.div>
      <animated.div style={resultsContainerProps} className="results-container">
        <animated.div
          style={flightCardsContainerProps}
          className="flight-cards-container"
        >
          <div className="loader-container">{loading ? <Loader /> : null}</div>
          {flights.map((flight: Flight, index) => (
            <animated.div
              className="flight-card"
              style={flightCardProps}
              key={index}
            >
              <h3>Flight ID: {flight.id}</h3>
              <p>Source: {flight.source}</p>
              <p>Date Purchasing: {flight.lastTicketingDateTime}</p>
              <p>
                Price: {flight.price.currency} {flight.price.total}
              </p>
              {/* Add more key details */}
              <button>View Details</button>
            </animated.div>
          ))}
        </animated.div>

        {/* <div className="map-container" style={{ height: "140vh" }}>
          {flights.length > 0 && (
            <MapContainer
              center={mapCenter}
              zoom={2}
              scrollWheelZoom={true}
              maxBoundsViscosity={1.0}
              style={{ width: "80%", height: "50%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {flights.map((flight:Flight, index) => (
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
        </div> */}
      </animated.div>
    </div>
  );
};

export default StartTraveling;
