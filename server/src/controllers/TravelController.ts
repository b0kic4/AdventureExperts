import { Request, Response } from "express";
import amadeus from "../api/amadeusApi";
// INTERFACES AND TYPES
type Location = string;
type CountryCode = string;
type AirportCode = string;

// START TRAVELING TODAY
//      Finding flights between two destinations

const getFlightOffers = async (req: Request, res: Response) => {
  try {
    console.log("Before calling amadeus.shopping.flightOffers.get");
    console.log(req.query);
    const locationCode = req.query.originLocationCode;
    const destinationLocationCode = req.query.destinationLocationCode;
    const departureDate = req.query.departureDate;
    const adults = req.query.adults;
    console.log(locationCode, destinationLocationCode, departureDate, adults);
    // Await the result of the asynchronous operation
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: locationCode,
      destinationLocationCode: destinationLocationCode,
      departureDate: departureDate,
      adults: adults,
    });

    console.log("After calling amadeus.shopping.flightOffers.get");
    console.log(response.data);

    // Send the response back to the client
    res.json(response.data);
  } catch (error: any) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ABOUT
const getCities = async (req: Request, res: Response) => {
  try {
    const location: Location = req.query.location
      ? String(req.query.location)
      : "";
    const countryCode: CountryCode = req.query.countryCode
      ? String(req.query.countryCode)
      : " ";

    const response = await amadeus.referenceData.locations.cities.get({
      keyword: location,
      countryCode: countryCode,
      include: "AIRPORTS",
    });
    res.send(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getDestinationsFromAirportCode = async (req: Request, res: Response) => {
  try {
    const airportCode: AirportCode = req.query.departureAirportCode
      ? String(req.query.departureAirportCode)
      : "";
    console.log("Airport Code: " + airportCode);
    const response = await amadeus.airport.directDestinations.get({
      departureAirportCode: airportCode,
    });
    console.log(response.data);
    console.log("Query: ", JSON.stringify(req.query));
    res.json(response.data);
  } catch (error: any) {
    console.error(error);
  }
};

export { getFlightOffers, getCities, getDestinationsFromAirportCode };
