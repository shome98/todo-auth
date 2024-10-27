import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-4xl">Welcome to Todo App</h1>
            <div className="flex items-center space-x-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                onClick={()=>navigate('/login')}>
            Login
        </button>
        <span className="text-lg font-semibold text-gray-500">or</span>
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                onClick={()=>navigate('/register')}>
            Create an account
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-teal-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                onClick={()=>navigate('/todolist')}>
            todo-check
                </button>
    </div>
        </div>
    );
};

export default Home;
