import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import AuthContext from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import SearchComponent from './SearchComponent';

export default function MenuNav() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="flex flex-col shadow-lg md:px-10 pt-4 pb-4 space-y-2">
      <div className="flex justify-between items-center h-16 px-4 md:px-0">
        <div className="flex items-center">
          <h1 className="md:text-xl text-green-600 cursor-pointer" onClick={homeNavigate}>Auto Share</h1>
        </div>
        <SearchComponent isHome={false} isBooking={false} />
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <div className="px-5 py-2 outline outline-1 outline-gray-300 rounded-3xl hover:scale-105 duration-150 cursor-not-allowed">
              Become host
            </div>
          </div>
          <div className="hidden lg:block">
            {user ? (
              <div className="flex items-center cursor-pointer" onClick={profileNavigate}>
                <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 mr-2" />
                {user.username}
              </div>
            ) : (
              <div className="px-5 py-2 outline outline-1 outline-gray-300 rounded-3xl cursor-pointer hover:scale-105 duration-150" onClick={loginNavigate}>
                Login / Sign up
              </div>
            )}
          </div>
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XIcon className="w-6 h-6" color="grey" /> : <MenuIcon className="w-6 h-6" color="grey" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col space-y-2 lg:hidden px-4">
          <div className="px-5 py-2 outline outline-1 outline-gray-300 rounded-3xl">
            Become host
          </div>
          {user ? (
            <div className="flex items-center cursor-pointer" onClick={profileNavigate}>
              <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 mr-2" />
              {user.username}
            </div>
          ) : (
            <div className="px-5 py-2 outline outline-1 outline-gray-300 rounded-3xl cursor-pointer hover:scale-105 duration-150" onClick={loginNavigate}>
              Login / Sign up
            </div>
          )}
        </div>
      )}
    </div>
  );
}
