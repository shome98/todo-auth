"use server";
import axios from "axios";

const API_URL = "https://todo-auth-kappa.vercel.app/api/v1/todos";

export const getTodos = async () => { 
    try {
        const response = await axios.get(`${API_URL}/`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("Can't get the todos!!! ", error);
    }
}

// Get a single todo by ID
export const getTodo = async (id: string) => { 
    try {
        const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Can't get the todo with ID ${id}!!! `, error);
        throw error;
    }
};

// Create a new todo
export const createTodo = async (todo: { title: string; description?: string }) => { 
    try {
        const response = await axios.post(API_URL, todo, { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error("Can't create the todo!!! ", error);
        throw error;
    }
};

// Update only the "completed" status of a todo
export const updateComplete = async (id: string, completed: boolean) => { 
    try {
        const response = await axios.patch(`${API_URL}/${id}`, { completed }, { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error(`Can't update the "completed" status for todo ID ${id}!!! `, error);
        throw error;
    }
};

// Update all fields of a todo (title, description, completed)
export const updateTodo = async (id: string, updatedTodo: { title?: string; description?: string; completed?: boolean }) => { 
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTodo, { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error(`Can't update the todo with ID ${id}!!! `, error);
        throw error;
    }
};

// Delete a todo by ID
export const deleteTodo = async (id: string) => { 
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Can't delete the todo with ID ${id}!!! `, error);
        throw error;
    }
};

// Get completed todos
export const getCompletedTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/status/completed`, { withCredentials: true });
        return response.data; // Return the data containing completed todos
    } catch (error) {
        console.error("Can't get completed todos!!!", error);
        throw error;
    }
};

// Get pending todos
export const getPendingTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/status/pending`, { withCredentials: true });
        return response.data; // Return the data containing pending todos
    } catch (error) {
        console.error("Can't get pending todos!!!", error);
        throw error;
    }
};