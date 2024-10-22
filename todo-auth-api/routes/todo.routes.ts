import express from "express";
import { auth } from "../middlewares/auth.middleware";
import { createTodo,getTodos} from "../controllers/todo.controller";

const router = express.Router();
//router.use(auth);
router.post('/', auth, createTodo);
router.get("/", auth, getTodos);



export default router;