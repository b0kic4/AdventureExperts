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
import amadeus from "./api/amadeusApi.js";
interface CustomRequest extends Request {
  user?: any;
}

const jwtSecretKey: string = crypto.randomBytes(32).toString("hex");
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

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.post("/register", async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, hashedPassword]
    );

    const user = result.rows[0];

    res.status(200).json({ message: "Registration successful", user });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const isEmail = emailOrUsername.includes("@");
    const key = isEmail ? "email" : "username";

    const result = await pool.query(`SELECT * FROM users WHERE ${key} = $1`, [
      emailOrUsername,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      jwtSecretKey,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token: string = req.headers.authorization
    ? req.headers.authorization.trim().split(" ")[1]
    : "";
  console.log(req.headers);
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Error: ", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

app.get(
  "/start-traveling",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      console.log(amadeus);
      const response = await amadeus.referenceData.locations.cities.get({
        keyword: "Paris",
      });
      res.send(response.data);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
