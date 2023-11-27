import express from "express";
import {
  getCities,
  getDestinationsFromAirportCode,
  getFlightOffers,
} from "../controllers/TravelController";
import { verifyToken } from "../middleware/VerifyToken";

const travelingRouter = express.Router();

travelingRouter.get("/get-cities", verifyToken, getCities);
travelingRouter.get(
  "/get-direct-Destinations",
  verifyToken,
  getDestinationsFromAirportCode
);
travelingRouter.get("/get-flight-offers", verifyToken, getFlightOffers);
export { travelingRouter };
