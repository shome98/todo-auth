import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//router.post("/logout", auth, logoutUser);

export default router;