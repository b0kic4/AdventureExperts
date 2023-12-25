import { Request, Response } from "express";
import amadeus from "../api/amadeusApi";

const getOffersFromHotel = async (req: Request, res: Response) => {
  console.log("Request Query:", req.query);

  const hotelOffers = amadeus.shopping.hotelOffersSearch;
  if (!hotelOffers) {
    console.error("amadeus.shopping.hotelOffers is undefined");
    return;
  }

  try {
    // Explicitly specify the type for hotelIds
    const hotelIds = req.query.hotelIds as string | string[] | undefined;
    const adults = parseInt(req.query.adults as string, 10);
    const checkInDate = req.query.checkInDate as string;
    const checkOutDate = req.query.checkOutDate as string;
    const roomQuantity = parseInt(req.query.roomQuantity as string, 10);
    const priceRange = req.query.priceRange as string;
    const currency = req.query.currency as string;
    const paymentPolicy = req.query.paymentPolicy as string;
    const boardType = req.query.boardType as string;
    const includeClosed = req.query.includeClosed === "true"; // Convert to boolean
    const bestRateOnly = req.query.bestRateOnly === "true"; // Convert to boolean
    const lang = req.query.lang as string;

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
    const response = await hotelOffers.get({
      hotelIds: hotelArray.join(","),
      adults: adults as number,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomQuantity: roomQuantity as number,
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
  } catch (err: any) {
    console.error("Error:", err);
    res.status(err.response.statusCode).json(err.response.data);
  }
};

const offerIdentifier = async (req: Request, res: Response) => {};

// Check availability of offers
const confirmingOffer = async (req: Request, res: Response) => {
  const { offerId } = req.query;
  const response = await amadeus.shopping.hotelOffer(offerId).get();
  try {
    res.send(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
};
// Booking the hotel
const bookTheHotel = async (req: Request, res: Response) => {
  const { offerId } = req.query;
  const { body } = req;
  const response = await amadeus.booking.hotelBookings.post(
    JSON.stringify({
      data: {
        offerId,
        guests: body.guests,
        payments: body.payments,
      },
    })
  );
  try {
    res.send(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
};

export { getOffersFromHotel, offerIdentifier, confirmingOffer, bookTheHotel };
