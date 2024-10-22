import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getIdFromToken } from "../utils/getIdFromToken";
import Todo from "../models/todo.model";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

//create a todo
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
    //const userId = await getIdFromToken(req);
    const userId = (req as any).userId;
    console.log(userId);
    const { title, description } = req.body;
    const todo = await Todo.create({ userId, title, description });
    const createdTodo = await Todo.findById(todo._id);
    return res.status(201).json(new ApiResponse(201, createdTodo, "Todo is created successfully."));
})

// Get all To-Dos for the authenticated user
export const getTodos = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const todos = await Todo.find({ userId });
    return res.status(200).json(new ApiResponse(200, todos, "Todos retrieved successfully."));
});

// Get a single To-Do by ID
export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const todoId = req.params.id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res.status(200).json(new ApiResponse(200, todo, "Todo retrieved successfully."));
});

