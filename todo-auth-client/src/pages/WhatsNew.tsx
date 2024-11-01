import { useSelector } from "react-redux";
import Feedback from "../components/Feedback";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const WhatsNew: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { isAuthenticated } = auth;
    const navigate = useNavigate();
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">What's New 🚀</h1>
            <p className="mb-2">I apologize for the issues you faced. I am currently working to fix them. Get ready for new updates! 🎉</p>
            <h2 className="text-2xl font-semibold mb-2">New Features:</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Improved user authentication process. 🔒</li>
                <li>Enhanced UI for a better user experience. 🎨</li>
                <li>List your todos. ⏰</li>
                <li>Added feature for filtering pending, completed todos. 🗂️</li>
            </ul>
            {isAuthenticated ? <Feedback /> : <h1 className="text-2xl font-bold">Please login to provide feedback thank you!!!❤️</h1>}
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               &larr; Go Back
            </button>
            <div className="mt-6">
                <a
                    href="https://github.com/shome98/todo-auth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Check out the GitHub repository
                </a>
            </div>
        </div>
    );
};

export default WhatsNew;
