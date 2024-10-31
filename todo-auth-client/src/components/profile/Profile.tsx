import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { updateUserPassword } from '../../slices/authSlice';
import toast from 'react-hot-toast';
import { Link} from 'react-router-dom';

const Profile = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { user } = auth;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const status = await dispatch(updateUserPassword({ oldPassword, newPassword }));
        setNewPassword("");
        setOldPassword("");
        if (status.meta.requestStatus === "rejected") {
            toast.error("Could not update the password!!!");
            return;
        }
        if (status.meta.requestStatus === "fulfilled") {
            toast.success("Successfully updated the password!!!");
            return;
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            {user && (
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">Profile</h1>
                            <hr />
                            {/* Display Username and Email */}
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-700">{user.username}</h2>
                                <h3 className="text-sm text-gray-500">{user.email}</h3>
                            </div>
                            <hr />

                            {/* Old Password Field */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                                </svg>
                                <input
                                    className="pl-2 outline-none border-none w-full"
                                    type="password"
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
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
                                    <Link to="/todolist" className='absolute'>&larr; Back</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
