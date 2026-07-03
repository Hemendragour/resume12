import { Response, NextFunction } from "express";

import { AuthRequest } from "./auth.middleware";

import { ApiError } from "../utils/ApiError";

export function adminOnly(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "admin") {
    throw new ApiError(
      403,
      "Admin access required"
    );
  }

  next();
}


// import { Response, NextFunction } from "express";

// import { AuthRequest } from "./auth.middleware";
// import { ApiError } from "../utils/ApiError";

// export function adminOnly(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log("========== ADMIN ==========");
//   console.log("User:", req.user);
//   console.log("Role:", req.user?.role);
//   console.log("===========================");

//   if (req.user?.role !== "admin") {
//     throw new ApiError(
//       403,
//       "Admin access required"
//     );
//   }

//   next();
// }