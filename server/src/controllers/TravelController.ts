import { Request, Response } from "express";
import amadeus from "../api/amadeusApi";

const getOriginLocations = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "CITY",
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (error: any) {
    // console.error("Error parsing or sending response:", error);
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
  } catch (error: any) {
    // console.error("Error parsing or sending response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get all the hotel offers available
const getHotelList = async (req: Request, res: Response) => {
  try {
    const { cityCode, radius, radiusUnit, amenities, ratings } = req.query;

    if (!cityCode) {
      return res.status(400).json({ error: "Missing cityCode parameter" });
    }
    const numericRadius = Number(radius);
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode.toString(),
      radius: numericRadius,
      radiusUnit: radiusUnit?.toString(),
      amenities: amenities,
      ratings: ratings,
    });

    const parsedResponse = JSON.parse(response.body);
    res.send(parsedResponse);
  } catch (err: any) {
    // console.log("Error Message: ", err.message);
    // console.error("Error fetching hotel list:", err);
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
