import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", auth, logoutUser);

export default router;