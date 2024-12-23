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
// export const loginUser = asyncHandler(async (req: Request, res: Response) => {
//     const { username, email, password } = req.body;

//     if (!username && !email) {
//         throw new ApiError(400, "Username or email is required");
//     }

//     const user = await User.findOne({ $or: [{ username }, { email }] });
//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         throw new ApiError(401, "Invalid credentials");
//     }

//     const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//     const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

//     user.refreshToken = refreshToken;
//     await user.save();

//     return res
//         .status(200)
//         .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
//         .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
//         .json(new ApiResponse(200, { user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }), accessToken, refreshToken }, "User logged in successfully"));
// });
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        console.log('No username or email provided');
        throw new ApiError(400, "Username or email is required");
    }

    //console.log('Login attempt with:', { username, email });

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        //console.log('User not found:', { username, email });
        throw new ApiError(404, "User not found");
    }

    //console.log('User found:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log('Invalid password for user:', user._id);
        throw new ApiError(401, "Invalid credentials");
    }

    //console.log('Password is valid for user:', user._id);

    // Generate tokens
    let accessToken, refreshToken;
    try {
        accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        //console.log('Access token generated successfully:', accessToken);
    } catch (error) {
        console.error('Error generating access token:', error);
        throw new ApiError(500, 'Error generating access token');
    }

    try {
        refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
        //console.log('Refresh token generated successfully:', refreshToken);
    } catch (error) {
        console.error('Error generating refresh token:', error);
        throw new ApiError(500, 'Error generating refresh token');
    }

    // Save refresh token in DB
    try {
        user.refreshToken = refreshToken;
        await user.save();
        //console.log('Refresh token saved for user:', user._id);
    } catch (error) {
        console.error('Error saving user refresh token:', error);
        throw new ApiError(500, 'Error saving refresh token');
    }

    // Send tokens in cookies
    // return res
    //     .status(200)
    //     .cookie("accessToken", accessToken, { httpOnly: true, secure: true})
    //     .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    //     .json(new ApiResponse(200, {
    //         user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }),
    //         accessToken,
    //         refreshToken
    //     }, "User logged in successfully"));
        return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true,sameSite: "none" as "none" | "lax" | "strict" })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true,sameSite: "none" as "none" | "lax" | "strict" })
        .json(new ApiResponse(200, { user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }), accessToken, refreshToken }, "User logged in successfully"));

});


// User Logout
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies?.accessToken;
    const userId2 = (req as any).userId;
    // userId2 = "";
    // console.log("from req as any from middleware id is ", userId2);
    // console.log("from response of middleware ", token);
    // const cookieUser = req.cookies?.user;
    // console.log("user from auth cookies ", cookieUser);
    //const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    // console.log(decoded);
    //const user = await User.findById(decoded.id).select("-password");
    //const user2 = await User.findById(userId2).select("-password");
    // console.log(user);
    //const userId = user2?._id;

    if (!userId2) {
        throw new ApiError(400, "User not authenticated");
    }

    //await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    await User.findByIdAndUpdate(userId2, { $unset: { refreshToken: 1 } });
    //console.log(User.findById(userId2));

    return res
        .status(200)
        .clearCookie("accessToken",{ httpOnly: true, secure: true,sameSite: "none" as "none" | "lax" | "strict" })
        .clearCookie("refreshToken",{ httpOnly: true, secure: true,sameSite: "none" as "none" | "lax" | "strict" })
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});
//export const logoutUser = () => {};

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, newPassword } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Please provide username or email to reset password.");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully."));
});

// Update password for authenticated user
export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const userId = (req as any).userId;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid old password.");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully."));
});