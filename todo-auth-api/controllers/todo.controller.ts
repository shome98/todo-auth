import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getIdFromToken } from "../utils/getIdFromToken";
import Todo from "../models/todo.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
    const userId = await getIdFromToken(req);
    const { title, description } = req.body;
    const todo = await Todo.create({ userId, title, description });
    const createdTodo = await Todo.findById(todo._id);
    return res.status(201).json(new ApiResponse(201, createdTodo, "Todo is created successfully."));
})