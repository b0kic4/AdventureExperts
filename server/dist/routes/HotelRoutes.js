"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRouter = void 0;
const express_1 = __importDefault(require("express"));
const VerifyToken_1 = require("../middleware/VerifyToken");
const HotelController_1 = require("../controllers/HotelController");
const hotelRouter = express_1.default.Router();
exports.hotelRouter = hotelRouter;
hotelRouter.get("/hotel-offers", VerifyToken_1.verifyToken, HotelController_1.getOffersFromHotel);
hotelRouter.get("/hotel-offer-identifier", VerifyToken_1.verifyToken, HotelController_1.offerIdentifier);
