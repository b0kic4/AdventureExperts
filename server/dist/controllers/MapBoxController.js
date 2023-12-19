"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mapBoxAccessToken = process.env.MAPBOX_ACCESS_KEY;
const sendToken = (req, res) => {
    res.send(mapBoxAccessToken);
};
exports.sendToken = sendToken;
