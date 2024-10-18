import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

//User registration
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
}