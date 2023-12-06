import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring } from "react-spring";
import "./style.css";
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
  const detailsProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  return (
    <>
      {flight && (
        <div className="overlay">
          <animated.div
            className="flight-modal"
            onClick={(e) => e.stopPropagation()}
            style={detailsProps}
          >
            <button id="close" onClick={onClose}>
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
                    {flight.pricingOptions.includedCheckedBagsOnly
                      ? flight.pricingOptions.includedCheckedBagsOnly.toString()
                      : "N/A"}
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

export default FlightModal;
