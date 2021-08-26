"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publitio_js_sdk_1 = __importDefault(require("publitio_js_sdk"));
const PUBLITIO_KEY = process.env.PUBLITIO_KEY;
const PUBLITIO_SECRET = process.env.PUBLITIO_SECRET;
const publitio = new publitio_js_sdk_1.default(PUBLITIO_KEY, PUBLITIO_SECRET);
exports.default = publitio;
//# sourceMappingURL=publitio.js.map