import { Link } from 'react-router-dom';

const LoggedOutPage = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm text-center">
                <h1 className="text-2xl font-semibold text-gray-600">
                    You're logged out!
                </h1>
                <p className="mt-4">
                    <Link
                        to="/"
                        className="text-blue-500 font-semibold hover:text-blue-800"
                    >
                        &larr; Go back to Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoggedOutPage;
