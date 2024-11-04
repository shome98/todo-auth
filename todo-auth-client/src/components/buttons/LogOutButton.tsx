import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
// import Cookies from 'js-cookie';

const LogOutButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLogout = async () => {
         const status = await dispatch(logout());
      if (status.meta.requestStatus === "fulfilled") {
        // Cookies.remove("accessToken");
        // Cookies.remove("refreshToken");
      toast.success("You are logged out!!!");
      navigate('/');
      return;
    }
    toast.error("Could not log you out!!!");
    }
  return (
    <button onClick={handleLogout} className= "mr-10 hover:bg-red-500 p-2 rounded transition-colors text-white">
          Logout
        </button>
  )
}

export default LogOutButton;