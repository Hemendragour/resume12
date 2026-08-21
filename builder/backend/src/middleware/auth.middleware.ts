import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { ParamsDictionary } from "express-serve-static-core";

import { User, IUser } from "../models/user.model";

export interface AuthRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: IUser;
  userId?: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. First try Authorization header
    const authHeader = req.headers.authorization;

    let token: string | undefined;
    console.log("getting the token from authheader before cookie", token);
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. If no Authorization token, try cookie
    if (!token) {
      token = req.cookies?.token;
    }

    // 3. No token found anywhere
    if (!token) {
      return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    // 4. Verify JWT
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return next(new ApiError(401, "Invalid token payload"));
    }

    // 5. Fetch user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    // 6. Attach user information
    req.user = user;
    req.userId = user._id.toString();
    console.log("checking people data", user);
    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token"));
    }

    return next(new ApiError(401, "Authentication failed"));
  }
};
