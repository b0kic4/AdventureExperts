import express from "express";
const authRouter = express.Router();
import { Login, Register } from "../controllers/AuthController";
import { verifyToken } from "../middleware/VerifyToken";
authRouter.post("/register", Register);
authRouter.post("/login", Login);

export { authRouter };
