"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelingRouter = void 0;
const express_1 = __importDefault(require("express"));
const TravelController_1 = require("../controllers/TravelController");
const VerifyToken_1 = require("../middleware/VerifyToken");
const travelingRouter = express_1.default.Router();
exports.travelingRouter = travelingRouter;
// travelingRouter.get("/get-cities", verifyToken, getCities);
// travelingRouter.get(
//   "/get-direct-Destinations",
//   verifyToken,
//   getDestinationsFromAirportCode
// );
travelingRouter.get("/get-origin-locations", VerifyToken_1.verifyToken, TravelController_1.getOriginLocations);
travelingRouter.get("/get-destinations-locations", VerifyToken_1.verifyToken, TravelController_1.getDestinationLocations);
travelingRouter.get("/get-flight-offers", VerifyToken_1.verifyToken, TravelController_1.getFlightOffers);
travelingRouter.get("/get-hotel-list", VerifyToken_1.verifyToken, TravelController_1.getHotelList);
