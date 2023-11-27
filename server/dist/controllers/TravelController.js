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
exports.getDestinationsFromAirportCode = exports.getCities = exports.getFlightOffers = void 0;
const amadeusApi_1 = __importDefault(require("../api/amadeusApi"));
// START TRAVELING TODAY
//      Finding flights between two destinations
const getFlightOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Before calling amadeus.shopping.flightOffers.get");
        console.log(req.query);
        const locationCode = req.query.originLocationCode;
        const destinationLocationCode = req.query.destinationLocationCode;
        const departureDate = req.query.departureDate;
        const adults = req.query.adults;
        console.log(locationCode, destinationLocationCode, departureDate, adults);
        // Await the result of the asynchronous operation
        const response = yield amadeusApi_1.default.shopping.flightOffersSearch.get({
            originLocationCode: locationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: departureDate,
            adults: adults,
        });
        console.log("After calling amadeus.shopping.flightOffers.get");
        console.log(response.data);
        // Send the response back to the client
        res.json(response.data);
    }
    catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getFlightOffers = getFlightOffers;
// ABOUT
const getCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = req.query.location
            ? String(req.query.location)
            : "";
        const countryCode = req.query.countryCode
            ? String(req.query.countryCode)
            : " ";
        const response = yield amadeusApi_1.default.referenceData.locations.cities.get({
            keyword: location,
            countryCode: countryCode,
            include: "AIRPORTS",
        });
        res.send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCities = getCities;
const getDestinationsFromAirportCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airportCode = req.query.departureAirportCode
            ? String(req.query.departureAirportCode)
            : "";
        console.log("Airport Code: " + airportCode);
        const response = yield amadeusApi_1.default.airport.directDestinations.get({
            departureAirportCode: airportCode,
        });
        console.log(response.data);
        console.log("Query: ", JSON.stringify(req.query));
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getDestinationsFromAirportCode = getDestinationsFromAirportCode;
