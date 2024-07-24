import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomeNav from "../components/HomeNav";
import SearchComponent from "../components/SearchComponent";
import { SearchContext } from "../contexts/SearchContext";
import AuthContext from "../contexts/AuthContext";

const OutlinedDiv = ({ label, value }) => {
  return (
    <div className="relative">
      <label className="absolute top-0 left-0 sm:left-1.5 px-1 bg-white font-normal text-gray-700 transform -translate-y-1/2 text-[9px] sm:text-[10px]">
        {label}
      </label>
      <div className="border border-gray-300 rounded-lg bg-white p-1 sm:p-2.5">
        <p className="text-gray-700 text-[12px] sm:text-sm">{value}</p>
      </div>
    </div>
  );
};

const CarDetails = ({ activeSection, onNavClick, car, coupon, handleCouponChange, discountApplied, amountSaved, totalPrice, handleBooking, user }) => {
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
  const featuresRef = useRef(null);
  const checkoutRef = useRef(null);

  const handleScrollToSection = (ref, section) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      onNavClick(section);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <img
        src={car.imgSrc}
        alt={car.imgAlt}
        className="w-full h-40 sm:h-80 object-cover rounded-t-lg"
      />

      <div className="p-4 flex justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm">Hosted by {car.owner}</h2>
          <p className="text-lg sm:text-[35px] font-bold">{car.title}</p>
          <div className="flex gap-1">
            {car.features.map((feature, index) => (
              <p
                key={index}
                className="text-[10px] sm:text-[15px] text-gray-500 dark:text-gray-400"
              >
                {index > 0 && <>&bull;</>} {feature}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center text-sm rounded-lg border h-16 w-24 bg-gray-100">
          <div className="flex flex-col items-center justify-center bg-green-700 text-white rounded-t-lg h-11 w-full">
            <div className="flex items-center justify-center">
              <span className="text-base sm:text-2xl font-bold">
                ★ {car.rating}
              </span>
              <span className="text-sm ml-1">({car.reviews.length})</span>
            </div>
          </div>
          <p className="text-sm text-center">Rating</p>
        </div>
      </div>

      <div className="px-4 flex flex-col">
        <nav className="flex flex-row space-x-0 sm:space-x-4 border-b border-gray-300 mb-4">
          <button
            onClick={() => handleScrollToSection(reviewsRef, "reviews")}
            className={`py-2 px-4 text-sm sm:text-base border-b-2 ${
              activeSection === "reviews"
                ? "border-neon-200 text-neon-200"
                : "border-transparent"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => handleScrollToSection(locationRef, "location")}
            className={`py-2 px-4 text-sm sm:text-base border-b-2 ${
              activeSection === "location"
                ? "border-neon-200 text-neon-200"
                : "border-transparent"
            }`}
          >
            Location
          </button>
          <button
            onClick={() => handleScrollToSection(featuresRef, "features")}
            className={`py-2 px-4 text-sm sm:text-base border-b-2 ${
              activeSection === "features"
                ? "border-neon-200 text-neon-200"
                : "border-transparent"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => handleScrollToSection(checkoutRef, "checkout")}
            className={`py-2 px-4 text-sm sm:text-base border-b-2 block sm:hidden ${
              activeSection === "checkout"
                ? "border-neon-200 text-neon-200"
                : "border-transparent"
            }`}
          >
            Checkout
          </button>
        </nav>
        <div className="flex-1 overflow-y-auto">
          <section id="reviews" ref={reviewsRef} className="mb-4">
            <h3 className="font-bold text-sm sm:text-base">Reviews</h3>
            {car.reviews && car.reviews.length > 0 ? (
              car.reviews.map((review, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 mt-2 border rounded shadow-sm bg-white"
                >
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-sm">{review.review}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {"★".repeat(Math.round(review.rating))}
                      {"☆".repeat(5 - Math.round(review.rating))}
                    </span>
                    <span className="ml-2 text-gray-600">{review.rating}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </section>
          <section id="location" ref={locationRef} className="mb-4">
            <h3 className="font-bold text-base">Location</h3>
            <p className="mb-4 p-4 mt-2 border rounded-xl text-sm shadow-sm bg-white">
              {car.address}
            </p>
          </section>
          <section id="features" ref={featuresRef}>
            <h3 className="font-bold text-base">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {car.additionalFeatures && car.additionalFeatures.length > 0 ? (
                car.additionalFeatures.map((additionalFeature, index) => (
                  <div key={index} className="mb-4 p-4 mt-2 bg-white">
                    <p className="text-sm">✅ {additionalFeature}</p>
                  </div>
                ))
              ) : (
                <p>No additional features available.</p>
              )}
            </div>
          </section>
          <section id="checkout" ref={checkoutRef} className="md:hidden">
            <div className="flex flex-col bg-white border border-gray-300 rounded-lg p-4 shadow-md mt-4">
              <h2 className="text-lg font-bold">Checkout</h2>
              <div className="my-2">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  className="border border-gray-300 p-2 w-full rounded-lg"
                  value={coupon}
                  onChange={handleCouponChange}
                />
                <p className="text-xs mt-1">
                  Enter code <strong>testing</strong> for free travel
                </p>
              </div>
              {discountApplied && (
                <>
                  <p className="text-green-600 font-bold">Offer Applied!</p>
                  <p className="text-gray-700">
                    You are saving ₹{parseFloat(amountSaved).toFixed(2)}
                  </p>
                </>
              )}
              <div className="flex my-2 justify-between">
                <p className="font-semibold text-base">Per day</p>
                <p className="text-gray-700 font-semibold">{car.price}</p>
              </div>
              <div className="flex my-2 justify-between">
                <p className="font-bold text-base">Trip Protection Package</p>
                <p className="text-gray-700 font-semibold">₹129</p>
              </div>
              <div className="flex my-2 justify-between">
                <p className="font-bold text-base">Total Price (Incl. taxes)</p>
                {discountApplied ? (
                  <>
                    <p className="text-base line-through">
                      ₹{parseFloat(amountSaved).toFixed(2)}
                    </p>
                    <p className="font-bold text-base">₹0.00</p>
                  </>
                ) : (
                  <p className="text-gray-700 font-semibold text-base">
                    ₹{parseFloat(totalPrice).toFixed(2)}
                  </p>
                )}
              </div>
              <button className="w-full bg-neon-200 text-white p-2 rounded-lg mt-4" onClick={handleBooking}>
                {user ? 'Pay Now' : 'Login to Book'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const calculateTotalPrice = (carPrice, startDate, endDate, protectionRate = 129) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.round(Math.abs((new Date(endDate) - new Date(startDate)) / oneDay)) + 1;
  const totalPrice = (totalDays * carPrice) + protectionRate;
  return totalPrice.toFixed(2);
};

export default function Booking() {
  const { user } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("reviews");
  const [coupon, setCoupon] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const { searchCriteria, setSearchCriteria } = useContext(SearchContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [amountSaved, setAmountSaved] = useState(0);

  useEffect(() => {
    const storedSearchCriteria = JSON.parse(localStorage.getItem('searchCriteria')) || {};
    setSearchCriteria(storedSearchCriteria);
  }, [setSearchCriteria]);

  useEffect(() => {
    if (searchCriteria.startDate && searchCriteria.endDate && car) {
      const totalAmount = calculateTotalPrice(car.price, searchCriteria.startDate, searchCriteria.endDate);
      setTotalPrice(parseFloat(totalAmount));
      setAmountSaved(parseFloat(totalAmount));
    }
  }, [searchCriteria, car]);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleCouponChange = (e) => {
    const { value } = e.target;
    setCoupon(value);
    if (value === "testing") {
      setDiscountApplied(true);
      setTotalPrice(0);
    } else {
      setDiscountApplied(false);
      const totalAmount = calculateTotalPrice(car.price, searchCriteria.startDate, searchCriteria.endDate);
      setTotalPrice(parseFloat(totalAmount));
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/users/${user._id}/booked-cars`, {
        carId: car._id,
        startDate: searchCriteria.startDate,
        endDate: searchCriteria.endDate
      });

      if (response.data.message === 'Car already booked for the selected dates') {
        toast.error('Car already booked for the selected dates');
      } else {
        toast.success('Car booked successfully');
      }

      console.log('Booking response:', response.data);
      navigate('/profile');
    } catch (error) {
      console.error('There was an error booking the car:', error);
      toast.error('Failed to book car');
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <HomeNav />
        <div className="flex justify-center bg-white shadow-b-l drop-shadow-lg py-0.5">
          <SearchComponent isHome={true} isBooking={true} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-evenly py-4 flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="md:w-3/5 flex-shrink-0 overflow-y-auto">
            <CarDetails
              activeSection={activeSection}
              onNavClick={handleNavClick}
              car={car}
              coupon={coupon}
              handleCouponChange={handleCouponChange}
              discountApplied={discountApplied}
              amountSaved={amountSaved}
              totalPrice={totalPrice}
              handleBooking={handleBooking}
              user={user}
            />
          </div>
          <div className="md:w-1/5 flex-shrink-0 bg-white border border-gray-300 rounded-lg p-4 md:h-fit shadow-md relative hidden md:block">
            <h2 className="text-lg font-bold text-center">Checkout</h2>
            <div className="my-2">
              <input
                type="text"
                placeholder="Enter coupon"
                className="border border-gray-300 p-2 w-full rounded-lg"
                value={coupon}
                onChange={handleCouponChange}
              />
              <p className="text-xs mt-1">
                Enter code <strong>testing</strong> for free travel
              </p>
            </div>
            {discountApplied && (
              <>
                <p className="text-green-600 font-bold">Offer Applied!</p>
                <p className="text-gray-700">
                  You are saving ₹{parseFloat(amountSaved).toFixed(2)}
                </p>
              </>
            )}
            <div className="flex my-2 justify-between">
              <p className="font-semibold text-base">Per day</p>
              <p className="text-gray-700 font-semibold">{car.price}</p>
            </div>
            <div className="flex my-2 justify-between">
              <p className="font-bold text-base">Trip Protection Package</p>
              <p className="text-gray-700 font-semibold">₹129</p>
            </div>
            <div className="flex my-2 justify-between">
              <p className="font-bold text-base">Total Price (Incl. taxes)</p>
              {discountApplied ? (
                <>
                  <p className="text-base line-through">
                    ₹{parseFloat(amountSaved).toFixed(2)}
                  </p>
                  <p className="font-bold text-base">₹0.00</p>
                </>
              ) : (
                <p className="text-gray-700 font-semibold text-base">
                  ₹{parseFloat(totalPrice).toFixed(2)}
                </p>
              )}
            </div>
            <button className="w-full bg-neon-200 text-white p-2 rounded-lg mt-4" onClick={handleBooking}>
              {user ? 'Pay Now' : 'Login to Book'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
