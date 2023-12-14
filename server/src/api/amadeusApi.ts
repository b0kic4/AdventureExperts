// amadeusApi.ts
import * as dotenv from "dotenv";
dotenv.config();
import Amadeus from "amadeus";

const amadeus: any = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_SECRET_KEY,
});

export default amadeus;
