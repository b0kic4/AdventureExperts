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
    if (!hotelOffers) {
        console.error("amadeus.shopping.hotelOffers is undefined");
        return;
    }
    try {
        // Explicitly specify the type for hotelIds
        const hotelIds = req.query.hotelIds;
        const adults = parseInt(req.query.adults, 10);
        const checkInDate = req.query.checkInDate;
        const checkOutDate = req.query.checkOutDate;
        const roomQuantity = parseInt(req.query.roomQuantity, 10);
        const priceRange = req.query.priceRange;
        const currency = req.query.currency;
        const paymentPolicy = req.query.paymentPolicy;
        const boardType = req.query.boardType;
        const includeClosed = req.query.includeClosed === "true"; // Convert to boolean
        const bestRateOnly = req.query.bestRateOnly === "true"; // Convert to boolean
        const lang = req.query.lang;
        console.log(req.query);
        // Convert hotelIds to an array
        const hotelArray = Array.isArray(hotelIds)
            ? hotelIds
            : typeof hotelIds === "string"
                ? [hotelIds]
                : [];
        console.log("Adults: ", typeof adults);
        console.log("check in date: ", typeof checkInDate);
        console.log("check out date: ", typeof checkOutDate);
        console.log("room quantity: ", typeof roomQuantity);
        console.log("price range: ", typeof priceRange);
        console.log("currenciy: ", typeof currency);
        console.log("board type: ", typeof boardType);
        const response = yield hotelOffers.get({
            hotelIds: hotelArray.join(","),
            adults: adults,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomQuantity: roomQuantity,
            priceRange: priceRange.toString(),
            currency: currency.toString(),
            // paymentPolicy: paymentPolicy.toString(),
            boardType: boardType.toString(),
            // includeClosed: includeClosed,
            // bestRateOnly: bestRateOnly,
            // lang: lang.toString(),
        });
        console.log(response);
        res.send(JSON.parse(response.body));
    }
    catch (err) {
        console.error("Error:", err);
        res.status(err.response.statusCode).json(err.response.data);
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
