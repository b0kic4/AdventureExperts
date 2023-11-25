import express from "express";
import { GetCities } from "../controllers/TravelController";
import { verifyToken } from "../middleware/VerifyToken";

const travelingRouter = express.Router();

travelingRouter.get("/get-cities", verifyToken, GetCities);

export { travelingRouter };
