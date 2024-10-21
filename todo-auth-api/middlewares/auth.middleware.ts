import { NextFunction,Request,Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";


export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  //const token = req.cookies?.accessToken;
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

    //req.user = user;
    //const refreshToken = user.refreshToken;
    // (req as any).user = user;
    res.cookie("accessToken", token, { httpOnly: true, secure: true });
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid token"));
  }
});