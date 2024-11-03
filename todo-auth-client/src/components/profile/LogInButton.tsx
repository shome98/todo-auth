import { useNavigate } from 'react-router-dom';

const LogInButton = () => {
  const navigate = useNavigate();
    return (
        <button onClick={() => navigate("login")} className="mr-10 p-2 rounded-md hover:bg-blue-700 text-white">
            Login
        </button>
    );
}

export default LogInButton