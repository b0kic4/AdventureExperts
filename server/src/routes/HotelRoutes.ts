import express from "express";
import { verifyToken } from "../middleware/VerifyToken";
import {
  getOffersFromHotel,
  confirmingOffer,
  bookTheHotel,
  offerIdentifier,
} from "../controllers/HotelController";

const hotelRouter = express.Router();

hotelRouter.get("/hotel-offers", verifyToken, getOffersFromHotel);
hotelRouter.get("/hotel-offer-identifier", verifyToken, offerIdentifier);

export { hotelRouter };
