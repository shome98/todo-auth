import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const router = Router();
//public routes
router.post("/register", registerUser);

export default router;