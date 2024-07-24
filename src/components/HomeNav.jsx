import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function HomeNav() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const homeNavigate = () => {
    navigate('/');
  };

  const loginNavigate = () => {
    navigate('/login');
  };

  const profileNavigate = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-row justify-between bg-stone-950 text-cyan-50 px-5 py-5">
      <div className="self-center text-xl md:text-2xl cursor-pointer" onClick={homeNavigate}>Auto Share</div>
      <div className="flex flex-row space-x-4">
        <div className="pl-5 pr-5 py-1 bg-slate-100 text-slate-950 rounded-xl hidden md:block hover:scale-105 duration-150 cursor-not-allowed">Become host</div>
        <div className="pl-5 pr-5 self-center hidden md:block hover:scale-105 duration-150 cursor-not-allowed">Company Profile</div>
        {user ? (
          <div className="pl-5 pr-5 self-center hover:scale-105 duration-150 cursor-pointer" onClick={profileNavigate}>Profile</div>
        ) : (
          <div className="pl-5 pr-5 self-center hover:scale-105 duration-150 cursor-pointer" onClick={loginNavigate}>Login / Sign up</div>
        )}
      </div>
    </div>
  );
}
