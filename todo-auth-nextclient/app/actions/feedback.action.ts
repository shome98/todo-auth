"use server";
import axios from "axios";

const API_URL = "https://todo-auth-kappa.vercel.app/api/v1/feedbacks";

// Function to get all feedbacks
export const getFeedbacks = async () => { 
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("Can't get the feedbacks!!! ", error);
        throw error; // Throw error to handle it in the slice
    }
}

// Function to create new feedback
export const createFeedback = async (feed: { userId: string; username?: string; feedback: string }) => { 
    try {
        const response = await axios.post(API_URL, feed, { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data; // Return created feedback
    } catch (error) {
        console.error("Can't create the feedback!!! ", error);
        throw error; // Throw error to handle it in the slice
    }
};
