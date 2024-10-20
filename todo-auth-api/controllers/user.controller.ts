import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

//User registration
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) throw new ApiError(400, "All of the filelds are required.");
    console.log(req.body);
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) throw new ApiError(409, "User with same email or username already exists.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email, username: username.toLowerCase(), password: hashedPassword
    });
    const createdUser = await User.findById(user._id).select("-password");
    return res.status(201).json(new ApiResponse(201, createdUser, "User registration is successfull."));
})