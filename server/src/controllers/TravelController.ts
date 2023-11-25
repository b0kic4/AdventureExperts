import { Request, Response } from "express";
import amadeus from "../api/amadeusApi";

type Location = string;
type CountryCode = string;
const GetCities = async (req: Request, res: Response) => {
  try {
    const location: Location = req.query.location
      ? String(req.query.location)
      : "";
    const countryCode: CountryCode = req.query.countryCode
      ? String(req.query.countryCode)
      : " ";
    console.log("Query: " + JSON.stringify(req.query));
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

export { GetCities };
