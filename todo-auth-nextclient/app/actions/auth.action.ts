"use server";
import axios from "axios";

const API_URL = "https://todo-auth-kappa.vercel.app/api/v1/users";

export const loginUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("User can't login!!!", error);
    }
};

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("User can't register!!!", error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("User can't logout error!!!", error);
    }
};

export const forgotPassword = async (userData: { username: string; email: string; newPassword:string }) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, userData);
        return response;
    } catch (error) {
        console.error("Password reset request failed!!!", error);
    }
};

export const updatePassword = async (passwordData: { oldPassword: string; newPassword: string }) => {
    try {
        const response = await axios.post(`${API_URL}/update-password`, passwordData, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("Password update failed!!!", error);
    }
};