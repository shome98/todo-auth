import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect";
import todoRoutes from "./routes/todo.routes";
import feedbackRoutes from "./routes/feedback.routes";

dotenv.config({
    path:"./env"
})

const corsOptions = {
    origin: ['http://localhost:5173','https://todo-auth-xklt.vercel.app'], // Change to your client-side origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//user routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/feedbacks", feedbackRoutes);

dbConnect()
    .then(() => app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`)))
    .catch(error => console.log(`MONGODB CONNECTION FAILED!!!. `, error));
