import express from "express";
const authRouter = express.Router();

import { Login, Register } from "../controllers/AuthController";
import { sendToken } from "../controllers/MapBoxController";
import { verifyToken } from "../middleware/VerifyToken";
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/get-map-access", verifyToken, sendToken);

export { authRouter };
