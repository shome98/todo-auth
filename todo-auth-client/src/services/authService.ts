const API_URL = "https://todo-auth-kappa.vercel.app/api/v1/users";
export const loginUser = async (userData: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const registerUser = async (userData: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};
