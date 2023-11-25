import express from "express";
const authRouter = express.Router();

import { Login, Register } from "../controllers/AuthController";

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export { authRouter };
