import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

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

//user Login
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .json(new ApiResponse(200, { user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }), accessToken, refreshToken }, "User logged in successfully"));
});

// User Logout
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
        throw new ApiError(400, "User not authenticated");
    }

    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });

    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});