import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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
