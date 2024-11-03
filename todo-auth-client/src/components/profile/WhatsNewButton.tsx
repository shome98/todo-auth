import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store';

const WhatsNewButton = () => {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const { isAuthenticated } = auth;
    return (
       <>
      {!isAuthenticated ? (
        <button
                className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg flex items-center space-x-2"
                onClick={() => navigate('/whats-new')}
            >
                <span>What's New</span> <span role="img" aria-label="rocket">🚀</span>
            </button>
      ) : (
        <button
          onClick={() => navigate('/whats-new')}
          className="hover:bg-gray-700 text-white flex items-center"
        >
          <span role="img" aria-label="sparkles" className="text-yellow-300">✨</span>
          <span>What's New</span>
        </button>
      )}
    </>
    );
}

export default WhatsNewButton