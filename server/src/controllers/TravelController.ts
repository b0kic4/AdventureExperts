import { Request, Response, response } from "express";
import amadeus from "../api/amadeusApi";
// INTERFACES AND TYPES

// type Location = string;
// type CountryCode = string;
// type AirportCode = string;

// START TRAVELING TODAY
//      Finding flights between two destinations

const getOriginLocations = async (req: Request, res: Response) => {
  try {
    console.log("Origin Req Query: ", req.query);
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "CITY",
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (error: any) {
    console.error("Error parsing or sending response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getDestinationLocations = async (req: Request, res: Response) => {
  try {
    console.log("Destination Req Query: ", req.query);
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "CITY",
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (error: any) {
    console.error("Error parsing or sending response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get all the hotel offers available
const getHotelOffers = async (req: Request, res: Response) => {
  console.log("Query: ", req.query);
  const { cityCode } = req.query;
  const response = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode,
  });
  try {
    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (err: any) {
    res.json(err);
  }
};
const getFlightOffers = async (req: Request, res: Response) => {
  try {
    const {
      originLocationCode,
      destinationLocationCode,
      depratureCode,
      adults,
    } = req.query;
    const response = await amadeus.shopping.flightOffers.get({
      originLocationCode,
      destinationLocationCode,
      depratureCode,
      adults,
    });
    console.log(response.data);
    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (error: any) {
    console.error(error);
  }
};
// Get all the offers from single hotel
// const getOffersFromHotel = async (req: Request, res: Response) => {
//   const { hotelId } = req.query;
//   const response = await amadeus.shopping.hotelOffersByHotel.get({
//     hotelId,
//   });
//   try {
//     res.json(JSON.parse(response.body));
//   } catch (err) {
//     res.json(err);
//   }
// };
// // Check availability of offers
// const confirmingOffer = async (req: Request, res: Response) => {
//   const { offerId } = req.query;
//   const response = await amadeus.shopping.hotelOffer(offerId).get();
//   try {
//     res.json(JSON.parse(response.body));
//   } catch (err) {
//     res.json(err);
//   }
// };
// // Booking the hotel
// const bookTheHotel = async (req: Request, res: Response) => {
//   const { offerId } = req.query;
//   const { body } = req;
//   const response = await amadeus.booking.hotelBookings.post(
//     JSON.stringify({
//       data: {
//         offerId,
//         guests: body.guests,
//         payments: body.payments,
//       },
//     })
//   );
//   try {
//     await res.json(JSON.parse(response.body));
//   } catch (err) {
//     await res.json(err);
//   }
// };

// // ABOUT
// const getCities = async (req: Request, res: Response) => {
//   try {
//     const location: Location = req.query.location
//       ? String(req.query.location)
//       : "";
//     const countryCode: CountryCode = req.query.countryCode
//       ? String(req.query.countryCode)
//       : " ";

//     const response = await amadeus.referenceData.locations.cities.get({
//       keyword: location,
//       countryCode: countryCode,
//       include: "AIRPORTS",
//     });
//     res.send(response.data);
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const getDestinationsFromAirportCode = async (req: Request, res: Response) => {
//   try {
//     const airportCode: AirportCode = req.query.departureAirportCode
//       ? String(req.query.departureAirportCode)
//       : "";
//     console.log("Airport Code: " + airportCode);
//     const response = await amadeus.airport.directDestinations.get({
//       departureAirportCode: airportCode,
//     });
//     console.log(response.data);
//     console.log("Query: ", JSON.stringify(req.query));
//     res.json(response.data);
//   } catch (error: any) {
//     console.error(error);
//   }
// };

export {
  getOriginLocations,
  getDestinationLocations,
  getFlightOffers,
  // getHotelOffers,
  // getOffersFromHotel,
  // getCities,
  // confirmingOffer,
  // bookTheHotel,
  // getDestinationsFromAirportCode,
};
