// src/features/todoSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodos, getTodo, createTodo, updateComplete, updateTodo, deleteTodo } from '../services/todoService';

interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    selectedTodo: Todo | null;
    loading: boolean;
    error: null | string;
}

const initialState: TodoState = {
    todos: [],
    selectedTodo: null,
    loading: false,
    error: null,
};

// Async thunks for API requests
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const response = await getTodos();
        return response?.data;
    } catch (error) {
        return rejectWithValue(`Failed to fetch todos ${error}`);
    }
});

export const fetchSingleTodo = createAsyncThunk('todos/fetchSingleTodo', async (id: string, { rejectWithValue }) => {
    try {
        const response = await getTodo(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(`Failed to fetch todo ${error}`);
    }
});

export const addNewTodo = createAsyncThunk('todos/addTodo', async (todo: { title: string; description?: string }, { rejectWithValue }) => {
    try {
        const response = await createTodo(todo);
        return response.data;
    } catch (error) {
        return rejectWithValue(`Failed to add todo ${error}`);
    }
});

export const toggleTodoComplete = createAsyncThunk('todos/toggleTodoComplete', async ({ id, completed }: { id: string; completed: boolean },{ rejectWithValue }) => {
    try {
        const response = await updateComplete(id,completed);
        return response.data;
    } catch (error) {
        return rejectWithValue(`Failed to toggle todo completion ${error}`);
    }
});

export const editExistingTodo = createAsyncThunk('todos/editTodo', async (todo: { id: string; title?: string; description?: string; completed?: boolean }, { rejectWithValue }) => {
    try {
        const response = await updateTodo(todo.id, todo);
        return response.data;
    } catch (error) {
        return rejectWithValue(`Failed to update todo ${error}`);
    }
});

export const removeExistingTodo = createAsyncThunk('todos/deleteTodo', async (id: string, { rejectWithValue }) => {
    try {
        await deleteTodo(id);
        return id;
    } catch (error) {
        return rejectWithValue(`Failed to delete todo ${error}`);
    }
});

// Slice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchSingleTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTodo = action.payload;
            })
            .addCase(fetchSingleTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addNewTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addNewTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleTodoComplete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleTodoComplete.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index].completed = action.payload.completed;
                }
            })
            .addCase(toggleTodoComplete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(editExistingTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editExistingTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(editExistingTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeExistingTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeExistingTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(removeExistingTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default todoSlice.reducer;
