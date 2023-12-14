import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import pool from "../db/server";
export const jwtSecretKey: string = crypto.randomBytes(32).toString("hex");

const Register = async (req: Request, res: Response) => {
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
};
const Login = async (req: Request, res: Response) => {
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
};

export { Register, Login };
