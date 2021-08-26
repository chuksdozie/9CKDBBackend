"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isOwner = exports.isSuperAdmin = exports.isVerified = void 0;
const error_1 = require("../config/error");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isVerified(req, _res, next) {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new error_1.APIError({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: "Secret not found",
                errors: "Secret not found",
            });
        }
        if (!req.headers["authorization"]) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User not authorized",
                errors: "User not authorized",
            });
        }
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (decoded.verified !== true) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User not verified yet",
                errors: "User not verified yet",
            });
        }
        console.log(true, decoded);
        req.admin = decoded;
        next();
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: error,
        });
    }
}
exports.isVerified = isVerified;
function isSuperAdmin(req, _res, next) {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new error_1.APIError({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: "Secret not found",
                errors: "Secret not found",
            });
        }
        if (!req.headers["authorization"]) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User not authorized",
                errors: "User not authorized",
            });
        }
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (decoded.role !== "super admin") {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User is not authorized",
                errors: "User is not authorized",
            });
        }
        console.log(true, decoded);
        req.admin = decoded;
        next();
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: error,
        });
    }
}
exports.isSuperAdmin = isSuperAdmin;
function isOwner(req, _res, next) {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new error_1.APIError({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: "Secret not found",
                errors: "Secret not found",
            });
        }
        if (!req.headers["authorization"]) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User not authorized",
                errors: "User not authorized",
            });
        }
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (decoded.owner !== true) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User is not authorized",
                errors: "User is not authorized",
            });
        }
        console.log(true, decoded);
        req.admin = decoded;
        next();
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: error,
        });
    }
}
exports.isOwner = isOwner;
function isAdmin(req, _res, next) {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new error_1.APIError({
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: "Secret not found",
                errors: "Secret not found",
            });
        }
        if (!req.headers["authorization"]) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User not authorized",
                errors: "User not authorized",
            });
        }
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded.id) {
            throw new error_1.APIError({
                status: http_status_1.default.UNAUTHORIZED,
                message: "User is not authorized",
                errors: "User is not authorized",
            });
        }
        console.log(true, decoded);
        req.admin = decoded;
        next();
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: error,
        });
    }
}
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map