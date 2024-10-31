import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { forgotUserPassword } from '../../slices/authSlice';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const status = await dispatch(forgotUserPassword({ username, email, newPassword }));
        if (status.meta.requestStatus === "fulfilled") {
            toast.success("Successfully changed password");
        } else {
            toast.error("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            <form onSubmit={handleSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Reset Password</h1>
                        <hr />

                        {/* Username Field */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 2c-3.31 0-6 2.69-6 6v1a1 1 0 001 1h10a1 1 0 001-1v-1c0-3.31-2.69-6-6-6z" />
                            </svg>
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
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
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
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
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
                                <a href="/login" className="absolute">&larr; Back to Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
