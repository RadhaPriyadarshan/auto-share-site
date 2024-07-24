import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { MenuIcon, XIcon } from '@heroicons/react/solid';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [bookedCars, setBookedCars] = useState([]);
  const [showReviewInput, setShowReviewInput] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedCars = async () => {
      try {
        console.log(`Fetching booked cars for user ID: ${user._id}`);
        const response = await axios.get(`${API_BASE_URL}/api/users/${user._id}/booked-cars`);
        setBookedCars(response.data);
      } catch (error) {
        console.error('Error fetching booked cars:', error);
      }
    };

    if (user) {
      fetchBookedCars();
    }
  }, [user]);

  const handleCancelBooking = async (carId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${user._id}/booked-cars/${carId}`);

      await axios.patch(`${API_BASE_URL}/api/cars/${carId}`, {
        bookingStartDateTime: null,
        bookingEndDateTime: null
      });
      
      setBookedCars(bookedCars.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleAddReview = async (carId, review, rating) => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/${carId}/reviews`, {
        user: user.username,
        review,
        rating
      });
      setBookedCars(bookedCars.map(car => car._id === carId ? { ...car, reviews: [...car.reviews, { user: user.username, review, rating }] } : car));
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-black p-4 shadow-md">
        <button className="text-neon-100 hover:underline" onClick={() => navigate(-1)}>Back</button>
        <h2 className="text-2xl text-white font-semibold">My Bookings</h2>
        <div className="flex space-x-11  items-center">
          <div className="hidden md:block">
            <button className="text-neon-100 hover:underline" onClick={() => navigate('/')}>Home</button>
          </div>
          <div className="hidden md:block">
            <button className="text-red-500 hover:underline" onClick={handleLogout}>Sign Out</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black p-4 shadow-md">
          <button className="block text-neon-100 hover:underline mb-2" onClick={() => navigate('/')}>Home</button>
          <button className="block text-red-500 hover:underline" onClick={handleLogout}>Sign Out</button>
        </div>
      )}
      <div className="p-4">
        {bookedCars.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-14">
            {bookedCars.map((car) => (
              <div key={car._id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={car.imgSrc} alt={car.imgAlt} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{car.title}</h3>
                  <p>{car.address}</p>
                  <p>Price per day: ₹{car.price}</p>
                  <p>Booking Start: {new Date(car.bookingStartDateTime).toLocaleDateString()}</p>
                  <p>Booking End: {new Date(car.bookingEndDateTime).toLocaleDateString()}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full"
                    onClick={() => handleCancelBooking(car._id)}
                  >
                    Cancel Booking
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                    onClick={() => setShowReviewInput(showReviewInput === car._id ? null : car._id)}
                  >
                    {showReviewInput === car._id ? 'Hide Review' : 'Add Review'}
                  </button>
                  {showReviewInput === car._id && (
                    <div className="mt-4">
                      <input type="text" placeholder="Review" className="border p-2 w-full mb-2" id={`review-${car._id}`} />
                      <input type="number" placeholder="Rating" className="border p-2 w-full mb-2" id={`rating-${car._id}`} />
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                        onClick={() => {
                          const review = document.getElementById(`review-${car._id}`).value;
                          const rating = parseInt(document.getElementById(`rating-${car._id}`).value);
                          handleAddReview(car._id, review, rating);
                          setShowReviewInput(null);
                        }}
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
