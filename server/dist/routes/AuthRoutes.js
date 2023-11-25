"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const AuthController_1 = require("../controllers/AuthController");
const MapBoxController_1 = require("../controllers/MapBoxController");
const VerifyToken_1 = require("../middleware/VerifyToken");
authRouter.post("/register", AuthController_1.Register);
authRouter.post("/login", AuthController_1.Login);
authRouter.get("/get-map-access", VerifyToken_1.verifyToken, MapBoxController_1.sendToken);
