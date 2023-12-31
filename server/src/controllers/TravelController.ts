import { Request, Response, response } from "express";
import amadeus from "../api/amadeusApi";
// INTERFACES AND TYPES

// type Location = string;
// type CountryCode = string;
// type AirportCode = string;

// START TRAVELING TODAY
//      Finding flights between two destinations
// console.log("Amadeus shopping object: ", amadeus.shopping);
const getOriginLocations = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "CITY",
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
    console.log(parsedResponse);
  } catch (error: any) {
    console.error("Error parsing or sending response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getDestinationLocations = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "CITY",
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
    console.log(parsedResponse);
  } catch (error: any) {
    console.error("Error parsing or sending response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get all the hotel offers available
const getHotelList = async (req: Request, res: Response) => {
  try {
    console.log("Query: ", req.query);
    const { cityCode, radius, radiusUnit, amenities, ratings } = req.query;

    if (!cityCode) {
      return res.status(400).json({ error: "Missing cityCode parameter" });
    }
    console.log("RADIUS TYPE: ", typeof radius);
    const numericRadius = Number(radius);
    console.log("NUMERIC RADIUS TYPE: ", typeof numericRadius);
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode.toString(),
      radius: numericRadius,
      radiusUnit: radiusUnit?.toString(),
      amenities: amenities,
      ratings: ratings,
    });

    const parsedResponse = JSON.parse(response.body);
    console.log("Hotels: ", parsedResponse);
    res.send(parsedResponse);
  } catch (err: any) {
    console.log("Error Message: ", err.message);
    console.error("Error fetching hotel list:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFlightOffers = async (req: Request, res: Response) => {
  try {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
    } = req.query;

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (error: any) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
  getHotelList,
  // getOffersFromHotel,
  // getCities,
  // confirmingOffer,
  // bookTheHotel,
  // getDestinationsFromAirportCode,
};
