import { config } from "dotenv";
config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import pool from "./db/server";
import axios, { AxiosRequestConfig } from "axios";
import { authRouter } from "./routes/AuthRoutes";
import { travelingRouter } from "./routes/TravelingRoutes";

const PORT: number | string = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// api
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// routes
app.use(authRouter);
app.use(travelingRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});