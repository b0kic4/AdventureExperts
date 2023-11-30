import express from "express";
import {
  getCities,
  getDestinationsFromAirportCode,
  getLocations,
} from "../controllers/TravelController";
import { verifyToken } from "../middleware/VerifyToken";

const travelingRouter = express.Router();

travelingRouter.get("/get-cities", verifyToken, getCities);
travelingRouter.get(
  "/get-direct-Destinations",
  verifyToken,
  getDestinationsFromAirportCode
);
travelingRouter.get("/get-locations", verifyToken, getLocations);
export { travelingRouter };
