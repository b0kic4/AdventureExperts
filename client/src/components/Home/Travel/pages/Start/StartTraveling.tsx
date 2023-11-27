import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
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

interface FlightDetailsProps {
  flight: Flight;
  onClose: () => void;
}

const StartTraveling: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const FlightDetails: React.FC<FlightDetailsProps> = ({ flight, onClose }) => {
    const detailsProps = useSpring({
      height: isExpanded ? "100%" : "0%",
      opacity: isExpanded ? 1 : 0,
      config: { duration: 500 },
    });

    return (
      <animated.div className="flight-details" style={detailsProps}>
        <h2>Flight Details</h2>
        <p>Flight ID: {flight.id}</p>
        <p>Source: {flight.source}</p>
        <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
        <p>Number of Bookable Seats: {flight.numberOfBookableSeats}</p>
        <h3>Itineraries:</h3>
        {flight.itineraries.map((itinerary: any, index) => (
          <div key={index}>
            <p>Duration: {itinerary.duration}</p>
            <h4>Segments:</h4>
            {itinerary.segments.map((segment: any, segmentIndex: any) => (
              <div key={segmentIndex}>
                <p>Departure: {segment.departure.iataCode}</p>
                <p>Arrival: {segment.arrival.iataCode}</p>
                {/* Add more segment details */}
              </div>
            ))}
          </div>
        ))}
        <h3>Price:</h3>
        <p>Currency: {flight.price.currency}</p>
        <p>Total: {flight.price.total}</p>
        {/* Add more price details */}
        <button onClick={onClose}>Close</button>
      </animated.div>
    );
  };

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

  const handleViewDetails = (flight: Flight) => {
    setSelectedFlight(flight);
    toggle(); // Toggle the expanded state when clicking "View Details"
  };

  const handleCloseDetails = () => {
    setSelectedFlight(null);
    toggle(); // Toggle the expanded state when closing details
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
              <button onClick={() => handleViewDetails(flight)}>
                View Details
              </button>
              {flight.id === selectedFlight?.id && (
                <FlightDetails
                  flight={selectedFlight}
                  onClose={handleCloseDetails}
                />
              )}
            </animated.div>
          ))}
        </animated.div>
      </animated.div>
    </div>
  );
};

export default StartTraveling;
