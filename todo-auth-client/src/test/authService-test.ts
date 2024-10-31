import axios from "axios";

const API_URL = "https://todo-auth-kappa.vercel.app/api/v1/users";
export const loginUser = async (userData: { username: string; password: string }) => {
    // const response = await fetch(`${API_URL}/login`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });
    try {
        const response = await axios.post(`${API_URL}/login`, userData,{ withCredentials: true });
        return response;
    } catch (error) {
        console.error("User can't login!!! ", error);
    }
};

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData,{ withCredentials: true });
        return response;
    } catch (error) {
        console.error("User can't register!!! ", error);
    }
};

// export const logoutUser = async (token:string) => {
//     try {
//         const response = await axios.post(`${API_URL}/logout`, {},{ withCredentials: true,headers:{
//                     Authorization: `Bearer ${token}`
//                 } });
//         return response;
//     } catch (error) {
//         console.error("User can't logout error!!! ", error);
//     }
// }
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {},{ withCredentials: true});
        return response;
    } catch (error) {
        console.error("User can't logout error!!! ", error);
    }
}
