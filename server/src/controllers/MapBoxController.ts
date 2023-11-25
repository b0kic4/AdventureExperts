import { Request, Response } from "express";
import { config } from "dotenv";
config();
const mapBoxAccessToken = process.env.MAPBOX_ACCESS_KEY;
const sendToken = (req: Request, res: Response) => {
  res.send(mapBoxAccessToken);
};
export { sendToken };
