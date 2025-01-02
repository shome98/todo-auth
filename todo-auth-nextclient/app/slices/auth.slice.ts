import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPassword, loginUser, logoutUser, registerUser, updatePassword } from "../actions/auth.action";


interface User{
    _id: string;
    username: string;
    email: string;
}
interface AuthState {
    user: null | User;
    loading: boolean;
    error: null | string;
    logoutStatus: null | number;
    passwordResetStatus: null | string;
    passwordUpdateStatus: null | string;
    isAuthenticated: boolean;
    // accessToken:null| string;
    // refreshToken: null|string;
}
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    logoutStatus: null,
    passwordResetStatus: null,
    passwordUpdateStatus: null,
    isAuthenticated: false,
    // accessToken: null,
    // refreshToken:null
};

export const login = createAsyncThunk('auth/login', async (userData: { username: string, password: string }) => {
    const response = await loginUser(userData);
    return response?.data;
});
export const register = createAsyncThunk('auth/register', async (userData: { username: string, email: string, password: string }) => {
    const response = await registerUser(userData);
    return response?.data;
});
export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await logoutUser();
    return response?.status;
});
export const forgotUserPassword = createAsyncThunk('auth/forgotPassword', async (userData: { username: string; email: string; newPassword:string },{rejectWithValue}) => {
    try {
        const response = await forgotPassword(userData);
        if (response?.status === 200) {
                return response?.data.message;
            } else {
                return rejectWithValue("Password reset failed");
            }
    } catch (error) {
         return rejectWithValue( `Password reset failed with ${error}`);
    }
    
});

export const updateUserPassword = createAsyncThunk(
    'auth/updatePassword',
    async (passwordData: { oldPassword: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await updatePassword(passwordData);

            if (response?.status === 200) {
                return response?.data.message; // success case
            } else {
                // Manually reject if status is not 200
                return rejectWithValue("Password update failed");
            }
        } catch (error) {
            // Pass the error message as the rejection reason
            return rejectWithValue( `Password update failed with ${error}`);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                // state.accessToken = action.payload.data.accessToken;
                // state.refreshToken = action.payload.data.refreshToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Login failed";
            })

            // Register cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Registration failed";
            })

            // Logout cases
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.logoutStatus = 200;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Logout failed";
            })

            // Forgot password cases
            .addCase(forgotUserPassword.pending, (state) => {
                state.loading = true;
                state.passwordResetStatus = null;
            })
            .addCase(forgotUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwordResetStatus = action.payload || "Password reset link sent";
            })
            .addCase(forgotUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Password reset request failed";
            })

            // Password update cases
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.passwordUpdateStatus = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwordUpdateStatus = action.payload || "Password updated successfully";
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Password update failed";
            });
    },
});

export default authSlice.reducer;