require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtSecretKey = crypto.randomBytes(32).toString("hex");

const PORT = process.env.PORT;
const app = express();
const pool = require("./db/server");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds

    // Use the pool to execute the SQL query
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

app.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the entered value is an email or a username
    const isEmail = emailOrUsername.includes("@");
    const key = isEmail ? "email" : "username";

    // Query the database to find the user based on email or username
    const result = await pool.query(`SELECT * FROM users WHERE ${key} = $1`, [
      emailOrUsername,
    ]);

    if (result.rows.length === 0) {
      // User not found
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Use bcrypt.compare to check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Incorrect password
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Handle successful login (you can redirect or show a success message)
    console.log("Login successful", user);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    // Handle login error
    console.error("Error during login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
