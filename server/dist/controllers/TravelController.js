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
exports.getFlightOffers = exports.getDestinationLocations = exports.getOriginLocations = void 0;
const amadeusApi_1 = __importDefault(require("../api/amadeusApi"));
// INTERFACES AND TYPES
// type Location = string;
// type CountryCode = string;
// type AirportCode = string;
// START TRAVELING TODAY
//      Finding flights between two destinations
const getOriginLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Origin Req Query: ", req.query);
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
exports.getOriginLocations = getOriginLocations;
const getDestinationLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Destination Req Query: ", req.query);
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
exports.getDestinationLocations = getDestinationLocations;
// Get all the hotel offers available
const getHotelOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Query: ", req.query);
    const { cityCode } = req.query;
    const response = yield amadeusApi_1.default.referenceData.locations.hotels.byCity.get({
        cityCode,
    });
    try {
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
    }
    catch (err) {
        res.json(err);
    }
});
const getFlightOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { originLocationCode, destinationLocationCode, depratureCode, adults, } = req.query;
        const response = yield amadeusApi_1.default.shopping.flightOffers.get({
            originLocationCode,
            destinationLocationCode,
            depratureCode,
            adults,
        });
        console.log(response.data);
        const parsedResponse = JSON.parse(response.body);
        res.send(parsedResponse);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getFlightOffers = getFlightOffers;
