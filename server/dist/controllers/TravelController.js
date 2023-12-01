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
exports.getDestinationsFromAirportCode = exports.getCities = exports.getLocations = void 0;
const amadeusApi_1 = __importDefault(require("../api/amadeusApi"));
// START TRAVELING TODAY
//      Finding flights between two destinations
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword } = req.query;
        const response = yield amadeusApi_1.default.referenceData.locations.get({
            keyword: keyword,
            subType: "CITY",
        });
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
    }
    catch (error) {
        console.error("Error parsing or sending response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getLocations = getLocations;
// Get all the hotel offers available
const getHotelOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityCode } = req.query;
    const response = yield amadeusApi_1.default.shopping.hotelOffers.get({
        cityCode,
    });
    try {
        res.json(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
});
// Get all the offers from single hotel
const getOffersFromHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hotelId } = req.query;
    const response = yield amadeusApi_1.default.shopping.hotelOffersByHotel.get({
        hotelId,
    });
    try {
        res.json(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
});
// Check availability of offers
const checkAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offerId } = req.query;
    const response = yield amadeusApi_1.default.shopping.hotelOffer(offerId).get();
    try {
        res.json(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
});
// Booking the hotel
const bookTheHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offerId } = req.query;
    const { body } = req;
    const response = yield amadeusApi_1.default.booking.hotelBookings.post(JSON.stringify({
        data: {
            offerId,
            guests: body.guests,
            payments: body.payments,
        },
    }));
    try {
        yield res.json(JSON.parse(response.body));
    }
    catch (err) {
        yield res.json(err);
    }
});
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
