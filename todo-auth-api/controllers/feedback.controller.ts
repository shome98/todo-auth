import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Feedback from "../models/feedback.model";
import { Schema } from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createFeedback = asyncHandler(async (req: Request, res: Response) => { 
    let { userId, username, feedback } = req.body;
    if (username === "") username = "Anonymous user";
    if (userId === "") username = "NA";
    const adminId: string | Schema.Types.ObjectId = process.env.ADMIN_ID as string;
    const feed = await Feedback.create({ adminId, userId, username, feedback });
    const newFeedback = await Feedback.findById(feed._id);
    return res.status(201).json(new ApiResponse(201, newFeedback, "Provided feedback successfully."));
});

export const getFeedbacks = asyncHandler(async (req: Request, res: Response) => {
    const adminId = (req as any).userId;
    const feedbacks = await Feedback.find({ adminId });
    //if(!feedbacks) throw new ApiError(404,"Feedbacks not found")
    return res.status(200).json(new ApiResponse(200, feedbacks, "Feedbacks retrieved successfully."));
});