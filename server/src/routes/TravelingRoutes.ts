import express from "express";
import {
  getOriginLocations,
  getDestinationLocations,
  getFlightOffers,
} from "../controllers/TravelController";
import { verifyToken } from "../middleware/VerifyToken";

const travelingRouter = express.Router();

// travelingRouter.get("/get-cities", verifyToken, getCities);
// travelingRouter.get(
//   "/get-direct-Destinations",
//   verifyToken,
//   getDestinationsFromAirportCode
// );
travelingRouter.get("/get-origin-locations", verifyToken, getOriginLocations);
travelingRouter.get(
  "/get-destinations-locations",
  verifyToken,
  getDestinationLocations
);
travelingRouter.get("/get-flight-offers", verifyToken, getFlightOffers);
// travelingRouter.get("/getHotelOffers", verifyToken, getHotelOffers);
// travelingRouter.get("/getOfferHotel", verifyToken, getOffersFromHotel);
// travelingRouter.get("/confirmingOffer", verifyToken, confirmingOffer);
// travelingRouter.post("/bookTheHotel", verifyToken, bookTheHotel);

export { travelingRouter };
