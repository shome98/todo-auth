import express from "express";
import { auth } from "../middlewares/auth.middleware";
import { createTodo } from "../controllers/todo.controller";

const router = express.Router();
//router.use(auth);
router.post('/', auth,createTodo);

export default router;