import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';

const LoggedInPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/logged-out');
    };
    const handleTodoList = async () => {
        navigate('/todolist')
    }
    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                <h1 className="text-center text-2xl font-semibold text-gray-600">
                    You're logged in!
                </h1>
                <button
                    onClick={handleLogout}
                    className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
                >
                    Logout
                </button>
                <button
                    onClick={handleTodoList}
                    className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
                >
                    Todolist
                </button>
            </div>
        </div>
    );
};

export default LoggedInPage;
