import { Request } from "express";
import { asyncHandler } from "./asyncHandler";
import { ApiError } from "./ApiError";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const getIdFromToken = async (req: Request):Promise<string|null> => {
    //const token = req.cookies?.accessToken;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(401, 'Access token is missing');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user._id.toString();
    } catch (error) {
        throw new ApiError(401, 'Invalid or expired token');
    }
}