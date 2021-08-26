import { Response, NextFunction, Request } from "express";
import { APIError } from "../config/error";
import status from "http-status";
import jwt from "jsonwebtoken";

export interface AdminRequest extends Request {
  admin?: adminJWTPayload | superAdminJWTPayload;
}

export function isVerified(
  req: AdminRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new APIError({
        status: status.INTERNAL_SERVER_ERROR,
        message: "Secret not found",
        errors: "Secret not found",
      });
    }

    if (!req.headers["authorization"]) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User not authorized",
        errors: "User not authorized",
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret) as adminJWTPayload;
    if (decoded.verified !== true) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User not verified yet",
        errors: "User not verified yet",
      });
    }
    console.log(true, decoded);
    req.admin = decoded;

    next();
  } catch (error) {
    throw new APIError({
      status: error.status || status.INTERNAL_SERVER_ERROR,
      message: error.message,
      errors: error,
    });
  }
}

export function isSuperAdmin(
  req: AdminRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new APIError({
        status: status.INTERNAL_SERVER_ERROR,
        message: "Secret not found",
        errors: "Secret not found",
      });
    }

    if (!req.headers["authorization"]) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User not authorized",
        errors: "User not authorized",
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret) as superAdminJWTPayload;
    if (decoded.role !== "super admin") {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User is not authorized",
        errors: "User is not authorized",
      });
    }
    console.log(true, decoded);
    req.admin = decoded;

    next();
  } catch (error) {
    throw new APIError({
      status: error.status || status.INTERNAL_SERVER_ERROR,
      message: error.message,
      errors: error,
    });
  }
}

export function isOwner(req: AdminRequest, _res: Response, next: NextFunction) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new APIError({
        status: status.INTERNAL_SERVER_ERROR,
        message: "Secret not found",
        errors: "Secret not found",
      });
    }

    if (!req.headers["authorization"]) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User not authorized",
        errors: "User not authorized",
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret) as superAdminJWTPayload;
    if (decoded.owner !== true) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User is not authorized",
        errors: "User is not authorized",
      });
    }
    console.log(true, decoded);
    req.admin = decoded;

    next();
  } catch (error) {
    throw new APIError({
      status: error.status || status.INTERNAL_SERVER_ERROR,
      message: error.message,
      errors: error,
    });
  }
}

export function isAdmin(req: AdminRequest, _res: Response, next: NextFunction) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new APIError({
        status: status.INTERNAL_SERVER_ERROR,
        message: "Secret not found",
        errors: "Secret not found",
      });
    }

    if (!req.headers["authorization"]) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User not authorized",
        errors: "User not authorized",
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret) as adminJWTPayload;
    if (!decoded.id) {
      throw new APIError({
        status: status.UNAUTHORIZED,
        message: "User is not authorized",
        errors: "User is not authorized",
      });
    }
    console.log(true, decoded);
    req.admin = decoded;

    next();
  } catch (error) {
    throw new APIError({
      status: error.status || status.INTERNAL_SERVER_ERROR,
      message: error.message,
      errors: error,
    });
  }
}
