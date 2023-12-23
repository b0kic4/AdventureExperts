import React, { useEffect, useRef, useState } from "react";
import { Hotel } from "../assets/interfaces/Hotel";
import { animated, useSpring } from "react-spring";
import CloseIcon from "@material-ui/icons/Close";
import "./style.css";
import { amenityIcons } from "../HotelList";
import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";

interface HotelModalProps {
  hotel: Hotel;
  onClose: () => void;
}

const HotelModal: React.FC<HotelModalProps> = ({ hotel, onClose }) => {
  const modalProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [hotelId, setHotelId] = useState<string[]>([]);

  useEffect(() => {
    console.log("Hotel ID before setting:", hotelId);
    if (hotel && hotel.hotelId) {
      const id = [hotel.hotelId];
      console.log("Setting hotelId:", id);
      setHotelId(id);
    }
  }, [hotel]);

  const getHotelOffers = async () => {
    const savedToken = localStorage.getItem("token");

    try {
      console.log("Before API call - getHotelOffers:", hotelId);

      const response = await axios.get("http://localhost:8081/hotel-offers", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
        params: {
          hotelIds: hotelId, // Use 'hotelIds' instead of 'hotelId'
        },
      });

      console.log("After Api Call hotel id: ", hotelId);
      console.log("After API call - getHotelOffers:", response.data);
      console.log("API response data:", response.data);
    } catch (error: any) {
      console.log("API error:", error);
      console.log("Request config:", error.config);
      console.log("Request payload:", JSON.stringify(error.config.data));
    }
  };

  const modalRef = useRef(null);
  useEffect(() => {
    // Add event listener to close modal on pressing the Escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): boolean => {
    return modalRef.current === e.target;
  };

  return (
    <div
      className="overlay"
      onClick={(e) => handleOverlayClick(e) || onClose()}
    >
      <animated.div
        className="hotel-modal"
        onClick={(e) => e.stopPropagation()}
        style={modalProps}
      >
        <div className="modal-header">
          <h2>{hotel.name}</h2>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-content">
          <div className="offer-button-container">
            <button className="offers-button" onClick={getHotelOffers}>
              Offers
            </button>
          </div>
          <p>
            Rating: {hotel.rating}
            <StarRateIcon />
          </p>
          <p>Chain Code: {hotel.chainCode}</p>
          <p>IATA Code: {hotel.iataCode}</p>
          <p>
            Location: {hotel.geoCode.latitude}, {hotel.geoCode.longitude}
          </p>
          <p>Address: {hotel.address.countryCode}</p>
          <p>
            Distance From Center Of The City: {hotel.distance.value}{" "}
            {hotel.distance.unit}
          </p>
          <p>Last Update: {hotel.lastUpdate}</p>
          <div className="amenities">
            <p>Amenities:</p>
            <ul>
              {hotel.amenities.map((amenity: any, index: number) => (
                <li key={index}>
                  <p>
                    {amenityIcons[amenity]} {amenity}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default HotelModal;
