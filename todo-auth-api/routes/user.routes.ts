import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, updatePassword } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.post("/logout", auth, logoutUser);
router.post("/update-password", auth, updatePassword);

export default router;