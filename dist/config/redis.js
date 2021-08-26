"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_PREFIX = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
exports.REDIS_PREFIX = process.env.REDIS_PREFIX;
exports.default = redis;
//# sourceMappingURL=redis.js.map