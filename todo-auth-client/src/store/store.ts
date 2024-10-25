import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.ts";
import todoReducer from "../slices/todoSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
