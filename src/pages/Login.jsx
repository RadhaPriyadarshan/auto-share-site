import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const response = await axios.post(`${API_BASE_URL}/api/users`, {
          username,
          email,
          password,
        });
        setMessage('Registration successful! Please log in.');
        setIsRegistering(false);
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
          email,
          password,
        });
        login(response.data.user);
        setMessage('Login successful!');
        navigate('/');
      }
    } catch (error) {
      setMessage('There was an error. Please check your details and try again.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-center">{isRegistering ? 'Auto share Register' : 'Auto share Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-neon-200 hover:bg-neon-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
            <button
              className="text-neon-200 hover:text-neon-100"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login' : 'Register here'}
            </button>
          </p>
          {!isRegistering && (
            <p className="text-sm text-gray-600 mt-4">
              <button
                className="text-neon-200 hover:text-neon-100"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </p>
          )}
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
