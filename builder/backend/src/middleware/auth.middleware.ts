import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { ParamsDictionary } from "express-serve-static-core";

import { User, IUser } from "../models/user.model"; // ← Import User model

export interface AuthRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: IUser;        // Full user object
  userId?: string;     // User ID as string
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return next(new ApiError(401, "Invalid token payload"));
    }

    // Fetch user from database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    // ✅ Set both as requested
    req.user = user;
    req.userId = user._id.toString();

    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token"));
    }

    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired"));
    }

    next(new ApiError(401, "Authentication failed"));
  }
};