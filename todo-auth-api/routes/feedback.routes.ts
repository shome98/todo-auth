import { Router } from "express";
import { createFeedback, getFeedbacks } from "../controllers/feedback.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", createFeedback);
router.get("/", auth, getFeedbacks);
export default router;