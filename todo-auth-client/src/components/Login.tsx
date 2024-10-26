import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state: RootState) => state.auth);
    const { loading, error, user } = auth;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ username, password }));

        if (!loading && user) {
            navigate("/loggedin"); // Redirect to the "You're logged in" page
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            <form onSubmit={handleLogin}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
                        <hr />
                        {/* Username Field */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 2c-3.31 0-6 2.69-6 6v1a1 1 0 001 1h10a1 1 0 001-1v-1c0-3.31-2.69-6-6-6z" />
                            </svg>
                            <input 
                                className="pl-2 outline-none border-none w-full" 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input 
                                className="pl-2 outline-none border-none w-full" 
                                type="password" 
                                name="password" 
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
                                <span className="ml-2">You don't have an account? <a href="/register" className="text-xs ml-2 text-blue-500 font-semibold">Register now &rarr;</a>
                                </span>
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
        </div>
    );
};

export default Login;