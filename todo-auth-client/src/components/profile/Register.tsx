import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../slices/authSlice"; // Importing the register action
import { AppDispatch } from "../../store/store";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface User {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<User>({
        username: '',  
        email: '',     
        password: ''   
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (user.password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Clear error if passwords match
        setError('');

        // Dispatch the register action if passwords are the same
        if (user.username && user.email && user.password) {
            const status=await dispatch(register(user));
            if (status.meta.requestStatus === "fulfilled") {
            toast.success("Successfully created an account here. Proceed to login!!!");
        } else {
            toast.error("Failed to create an account. Please try again!!!");
        }
            setUser({ username: '', email: '', password: '' });
            setConfirmPassword('');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            <form method='POST' action='#' onSubmit={handleSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Create your Account</h1>
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
                                value={user?.username || ''}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                                name="email" 
                                placeholder="Email" 
                                value={user?.email || ''}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                value={user?.password || ''}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required 
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input 
                                className="pl-2 outline-none border-none w-full" 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="text-red-500 text-sm text-center mb-4">
                                {error}
                            </div>
                        )}
                    </div>
                    
                    <button type="submit" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                        Register
                    </button>
                </div>
                
                <div className="pt-6 text-base font-semibold leading-7">
                    <p className="font-sans text-red-500 text-md hover:text-red-800">
                        <Link to="/" className="absolute">&larr; Home</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
