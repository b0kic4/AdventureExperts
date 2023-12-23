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
exports.bookTheHotel = exports.confirmingOffer = exports.offerIdentifier = exports.getOffersFromHotel = void 0;
const amadeusApi_1 = __importDefault(require("../api/amadeusApi"));
const getOffersFromHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Query:", req.query);
    const hotelOffers = amadeusApi_1.default.shopping.hotelOffersSearch;
    console.log(hotelOffers);
    if (!hotelOffers) {
        console.error("amadeus.shopping.hotelOffers is undefined");
        return;
    }
    try {
        const { hotelIds } = req.query;
        console.log("Hotel IDs:", hotelIds);
        const response = yield hotelOffers.get({
            hotelIds: Array.isArray(hotelIds) ? hotelIds : [hotelIds],
        });
        res.send(JSON.parse(response.body));
    }
    catch (err) {
        console.error("Error:", err);
        res.json(err);
    }
});
exports.getOffersFromHotel = getOffersFromHotel;
const offerIdentifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.offerIdentifier = offerIdentifier;
// Check availability of offers
const confirmingOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offerId } = req.query;
    const response = yield amadeusApi_1.default.shopping.hotelOffer(offerId).get();
    try {
        res.send(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
});
exports.confirmingOffer = confirmingOffer;
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
        res.send(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
});
exports.bookTheHotel = bookTheHotel;
