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
export const getTodo = async () => { }
export const createTodo = async () => { }
export const updateComplete = async () => { }
export const updateTodo = async () => { }
export const deleteTodo=async()=>{}