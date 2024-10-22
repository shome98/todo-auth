import express from "express";
import { auth } from "../middlewares/auth.middleware";
import { createTodo, deleteTodo, getTodoById, getTodos, patchTodo, updateTodo,} from "../controllers/todo.controller";

const router = express.Router();
//router.use(auth);
router.post('/', auth, createTodo);
router.get("/", auth, getTodos);
router.get("/:id", auth, getTodoById);
router.put("/:id", auth, updateTodo);
router.patch("/:id", auth, patchTodo);
router.delete("/:id", auth, deleteTodo);



export default router;