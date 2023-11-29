import { Request, Response, response } from "express";
import amadeus from "../api/amadeusApi";
// INTERFACES AND TYPES

type Location = string;
type CountryCode = string;
type AirportCode = string;

// START TRAVELING TODAY
//      Finding flights between two destinations

const getFlightOffers = async (req: Request, res: Response) => {
  try {
    const locationCode = req.query.originLocationCode as string;
    const destinationLocationCode = req.query.destinationLocationCode as string;
    const departureDate = req.query.departureDate as string;
    const adults = req.query.adults as string;

    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: locationCode,
        destinationLocationCode: destinationLocationCode,
        departureDate: departureDate,
        adults: adults,
      })
      .then(function (response: Response) {
        return amadeus.shopping.flightOffers.prediction.post(
          JSON.stringify(response)
        );
      })
      .then(function (predictedResponse: Response) {
        const predictedOffers = predictedResponse;
        console.log("Predicted Offers: ", predictedOffers);
        res.json({ predictedOffers });
      })
      .catch(function (responseError: Error) {
        console.log(responseError);
        res.json({ predictedOffers: [] });
      });
  } catch (error) {
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
