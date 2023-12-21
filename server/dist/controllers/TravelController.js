"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelList = exports.getFlightOffers = exports.getDestinationLocations = exports.getOriginLocations = void 0;
const amadeusApi_1 = __importDefault(require("../api/amadeusApi"));
// INTERFACES AND TYPES
// type Location = string;
// type CountryCode = string;
// type AirportCode = string;
// START TRAVELING TODAY
//      Finding flights between two destinations
// console.log("Amadeus shopping object: ", amadeus.shopping);
const getOriginLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword } = req.query;
        const response = yield amadeusApi_1.default.referenceData.locations.get({
            keyword: keyword,
            subType: "CITY",
        });
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
        console.log(parsedResponse);
    }
    catch (error) {
        console.error("Error parsing or sending response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getOriginLocations = getOriginLocations;
const getDestinationLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword } = req.query;
        const response = yield amadeusApi_1.default.referenceData.locations.get({
            keyword: keyword,
            subType: "CITY",
        });
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
        console.log(parsedResponse);
    }
    catch (error) {
        console.error("Error parsing or sending response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDestinationLocations = getDestinationLocations;
// Get all the hotel offers available
const getHotelList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Query: ", req.query);
        const { cityCode, radius, radiusUnit, amenities, ratings } = req.query;
        if (!cityCode) {
            return res.status(400).json({ error: "Missing cityCode parameter" });
        }
        console.log("RADIUS TYPE: ", typeof radius);
        const numericRadius = Number(radius);
        console.log("NUMERIC RADIUS TYPE: ", typeof numericRadius);
        const response = yield amadeusApi_1.default.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode.toString(),
            radius: numericRadius,
            radiusUnit: radiusUnit === null || radiusUnit === void 0 ? void 0 : radiusUnit.toString(),
            amenities: amenities,
            ratings: ratings,
        });
        const parsedResponse = JSON.parse(response.body);
        console.log("Hotels: ", parsedResponse);
        res.send(parsedResponse);
    }
    catch (err) {
        console.log("Error Message: ", err.message);
        console.error("Error fetching hotel list:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getHotelList = getHotelList;
const getFlightOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { originLocationCode, destinationLocationCode, departureDate, adults, } = req.query;
        const response = yield amadeusApi_1.default.shopping.flightOffersSearch.get({
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults,
        });
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
    }
    catch (error) {
        // console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getFlightOffers = getFlightOffers;
