
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

// Define custom type for decoded token
interface ITokenPayload extends JwtPayload {
  _id: string;
  email: string;
  role: string;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
    console.log(token)
    if (!token) {
      return next(new ApiError(401, "Unauthorized request: No token found"));
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as ITokenPayload;

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next(new ApiError(401, "Invalid access token"));
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    return next(new ApiError(401, "Invalid or expired token"));
  }
};
