"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = exports.jwtSecretKey = void 0;
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const server_1 = __importDefault(require("../db/server"));
exports.jwtSecretKey = crypto.randomBytes(32).toString("hex");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const hashedPassword = yield bcrypt.hash(password, 10);
        const result = yield server_1.default.query("INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, username, email, hashedPassword]);
        const user = result.rows[0];
        res.status(200).json({ message: "Registration successful", user });
    }
    catch (error) {
        console.error("Error during registration", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const isEmail = emailOrUsername.includes("@");
        const key = isEmail ? "email" : "username";
        const result = yield server_1.default.query(`SELECT * FROM users WHERE ${key} = $1`, [
            emailOrUsername,
        ]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const user = result.rows[0];
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({
            userId: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
        }, exports.jwtSecretKey, {
            expiresIn: "6h",
        });
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.Login = Login;
