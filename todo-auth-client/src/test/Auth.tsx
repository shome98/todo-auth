import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotUserPassword, login } from "../../slices/authSlice";
import { AppDispatch, RootState } from "../../store/store";

const Auth = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const auth = useSelector((state: RootState) => state.auth);
    const { loading, error, isAuthenticated} = auth;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ username, password }));
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const status = await dispatch(forgotUserPassword({ username, email, newPassword }));
        if (status.meta.requestStatus === "fulfilled") {
            toast.success("Successfully changed password");
            setShowForgotPassword(false); // Close the forgot password form
        } else {
            toast.error("Failed to change password. Please try again.");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/todolist");
            toast.success(`You are logged in!!!`);
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            {!showForgotPassword ? (
                <form onSubmit={handleLogin}>
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
                            <hr />

                            {/* Username Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Error Message */}
                            {error && <div className="text-red-500 text-center">{error}</div>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <hr />
                            <div className="flex justify-center items-center mt-4">
                                <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                                    <span className="ml-2">Forgot password? <button type="button" className="text-xs ml-2 text-blue-500 font-semibold" onClick={() => setShowForgotPassword(true)}>Reset password now &rarr;</button></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 text-base font-semibold leading-7">
                        <p className="font-sans text-red-500 text-md hover:text-red-800">
                            <a href="/" className="absolute">&larr; Home</a>
                        </p>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleForgotPassword}>
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">Forgot Password</h1>
                            <hr />

                            {/* Username Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* New Password Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
                            >
                                Submit
                            </button>

                            <div className="pt-6 text-base font-semibold leading-7">
                                <p className="font-sans text-red-500 text-md hover:text-red-800">
                                    <button type="button" className="absolute" onClick={() => setShowForgotPassword(false)}>&larr; Back to Login</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Auth;
