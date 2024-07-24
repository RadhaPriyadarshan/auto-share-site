import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ClipLoader } from 'react-spinners';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/users/reset-password`, {
        token,
        newPassword,
      });
      setMessage('Password reset successful! Please log in.');
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 3000); 
    } catch (error) {
      console.error('Error resetting password:', error.response ? error.response.data : error.message);
      setMessage('Error resetting password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-neon-200 hover:bg-neon-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#fff"} /> : "Reset Password"}
            </button>
          </div>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
