import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth.slice";
import todoSlice from "../slices/todo.slice";
import feedbackSlice from "../slices/feedback.slice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        todos:todoSlice,
        feedback:feedbackSlice
    }
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;