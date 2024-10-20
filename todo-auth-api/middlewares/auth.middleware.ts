import { NextFunction } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";


export const auth=async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Authorization token is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid token"));
  }
};