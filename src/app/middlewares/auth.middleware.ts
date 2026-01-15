
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../module/users/user.model";

// Define custom type for decoded token
interface ITokenPayload extends JwtPayload {
  _id: string;
  email: string;
  role: string;
}

// Role-aware middleware factory. Use `checauth()` for generic auth or `checauth('admin')` for role checks.
export const checkAuth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return next(new ApiError(401, "You are not authorized!"));
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as ITokenPayload;

      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        return next(new ApiError(404, "User not found!"));
      }

      if (!user.isVerifyEmail) {
        return next(new ApiError(401, "Please verify your email!"));
      }

      if (roles.length && !roles.includes(user.role)) {
        return next(new ApiError(403, "Forbidden!"));
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
};

// Backwards-compatible alias (single middleware) for existing usages
export const verifyJWT = checkAuth();
