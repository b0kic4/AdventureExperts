import { Request, Response } from "express";
import amadeus from "../api/amadeusApi";

const getOffersFromHotel = async (req: Request, res: Response) => {
  console.log("Request Query:", req.query);

  const hotelOffers = amadeus.shopping.hotelOffersSearch;
  console.log(hotelOffers);
  if (!hotelOffers) {
    console.error("amadeus.shopping.hotelOffers is undefined");
    return;
  }

  try {
    const { hotelIds } = req.query;
    console.log("Hotel IDs:", hotelIds);

    const response = await hotelOffers.get({
      hotelIds: Array.isArray(hotelIds) ? hotelIds : [hotelIds],
    });

    res.send(JSON.parse(response.body));
  } catch (err: any) {
    console.error("Error:", err);
    res.json(err);
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
