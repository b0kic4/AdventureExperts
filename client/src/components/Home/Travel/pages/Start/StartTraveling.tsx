import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import Loader from "../../../../assets/Loader";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

const FlightModal: React.FC<FlightDetailsProps> = ({ flight, onClose }) => {
  // const [scrollPosition, setScrollPosition] = useState<number>(0);
  // const flightModalRef = useRef<HTMLDivElement>(null);
  const detailsProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (flightModalRef.current) {
  //       setScrollPosition(flightModalRef.current.scrollTop);
  //     }
  //   };

  //   if (flightModalRef.current) {
  //     flightModalRef.current.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (flightModalRef.current) {
  //       flightModalRef.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <>
      {flight && (
        <div className="overlay">
          <animated.div className="flight-modal" style={detailsProps}>
            <button
              id="close"
              // className={scrollPosition > 100 ? "transparent" : ""}
              onClick={onClose}
            >
              <FontAwesomeIcon size={"2xl"} icon={faClose} />
            </button>
            <div className="modal-header">
              <h2>Flight Details</h2>
            </div>
            <div className="modal-content">
              <div className="flight-section">
                <div className="section">
                  <h3>Depart</h3>
                  <p>Flight ID: {flight.id}</p>
                  <p>Source: {flight.source}</p>
                  <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                  <p>
                    Number of Bookable Seats: {flight.numberOfBookableSeats}
                  </p>
                </div>
                <div className="section">
                  <h3>Itineraries:</h3>
                  {flight.itineraries.map((itinerary: any, index) => (
                    <div key={index} className="section">
                      <p>Duration: {itinerary.duration}</p>
                      <h4>Segments:</h4>
                      {itinerary.segments.map(
                        (segment: any, segmentIndex: any) => (
                          <div key={segmentIndex} className="section">
                            <p>
                              Departure From: {segment.departure.iataCode} -
                              Terminal: {segment.departure.terminal}
                            </p>
                            <p>Departure At: {segment.departure.at}</p>
                            <p>
                              Arrival At: {segment.arrival.iataCode} - Terminal:{" "}
                              {segment.arrival.terminal} Time:{" "}
                              {segment.arrival.at}
                            </p>
                            <p>Carrier Code: {segment.carrierCode}</p>
                            <p>Number: {segment.number}</p>
                            <p>Aircraft Code: {segment.aircraft.code}</p>
                            <p>
                              Operating Carrier Code:{" "}
                              {segment.operating.carrierCode}
                            </p>
                            <p>Duration Time: {segment.duration}</p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
                <div className="section">
                  <h3>Price:</h3>
                  <p>Currency: {flight.price.currency}</p>
                  <p>Total: {flight.price.total}</p>
                </div>
                <div className="section">
                  <h3>Pricing Options:</h3>
                  <p>Fare Type: {flight.pricingOptions.fareType.join(", ")}</p>
                  <p>
                    Included Checked Bags Only:{" "}
                    {flight.pricingOptions.includedCheckedBagsOnly.toString()}
                  </p>
                </div>
                <div className="section">
                  <h3>Traveler Pricings:</h3>
                  {flight.travelerPricings.map(
                    (traveler: any, travelerIndex) => (
                      <div key={travelerIndex} className="section">
                        <p>Traveler ID: {traveler.travelerId}</p>
                        <p>Fare Option: {traveler.fareOption}</p>
                        <p>Traveler Type: {traveler.travelerType}</p>
                        <p>Total Price: {traveler.price.total}</p>
                        <p>
                          Pricing Details:
                          {"\n"}
                          Currency: {traveler.price.currency}
                          {"\n"}
                          Total: {traveler.price.total}
                          {"\n"}
                          Base price: {traveler.price.base}
                        </p>
                        <h4>Fare Details By Segment:</h4>
                        {traveler.fareDetailsBySegment.map(
                          (fareDetail: any, index: number) => (
                            <div key={index} className="section">
                              <p>Segment ID: {fareDetail.segmentId}</p>
                              <p>Cabin: {fareDetail.cabin}</p>
                              <p>Fare Basis: {fareDetail.fareBasis}</p>
                              <p>Branded Fare: {fareDetail.brandedFare}</p>
                              <p>Class: {fareDetail.class}</p>
                              <p>
                                Included Checked Bags Quantity:{" "}
                                {fareDetail.includedCheckedBags.quantity}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
};

const StartTraveling: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
    setShowModal(false);
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

  return (
    <div className="main-container">
      <div className="form-container">
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
      </div>
      <div className="results-container">
        <div className="loader-container">{loading ? <Loader /> : null}</div>
        <div className="flight-cards-container">
          {flights.map((flight: Flight, index) => (
            <div className="flight-card" key={index}>
              <h3>Flight ID: {flight.id}</h3>
              <p>Source: {flight.source}</p>
              <p>Date Purchasing: {flight.lastTicketingDateTime}</p>
              <p>
                Price: {flight.price.currency} {flight.price.total}
              </p>
              <button onClick={() => handleViewDetails(flight)}>
                View Details
              </button>
            </div>
          ))}
        </div>
        {showModal && (
          <FlightModal flight={selectedFlight!} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default StartTraveling;
