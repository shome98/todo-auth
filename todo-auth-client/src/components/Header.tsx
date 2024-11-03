import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import LogOutButton from './profile/LogOutButton';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './profile/ProfileButton';
import LogInButton from './profile/LogInButton';
import WhatsNewButton from './profile/WhatsNewButton';

const Header = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { isAuthenticated } = auth;
    const navigate = useNavigate();
  return (
      <header className="bg-slate-700 text-white py-2 shadow-md ">
          <div className="container mx-auto flex flex-row  justify-between items-center">
              <img src='/todoLogo2.jpg' className='w-15 h-10 rounded-md mx-2' onClick={() => navigate("/todolist")} />
              {isAuthenticated?(<><WhatsNewButton/><ProfileButton/>
              <LogOutButton /></>):(<LogInButton/>)}
          </div>
      </header>
  )
}

export default Header