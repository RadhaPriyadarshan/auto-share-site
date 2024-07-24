import { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { CarContext } from '../contexts/CarContext';
import { SearchContext } from '../contexts/SearchContext';
import { API_BASE_URL } from '../config';

const SearchComponent = ({ isHome, isBooking }) => {
  const { setCars } = useContext(CarContext);
  const { searchCriteria, setSearchCriteria } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [suggestions, setSuggestions] = useState([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [dateTimeDisplay, setDateTimeDisplay] = useState('');

  useEffect(() => {
    // Parse query parameters from URL or get from localStorage
    const queryParams = new URLSearchParams(location.search);
    const storedSearchCriteria = JSON.parse(localStorage.getItem('searchCriteria')) || {};
    const params = {
      startDate: queryParams.get('startDate') ? new Date(queryParams.get('startDate')) : storedSearchCriteria.startDate || null,
      endDate: queryParams.get('endDate') ? new Date(queryParams.get('endDate')) : storedSearchCriteria.endDate || null,
      location: queryParams.get('location') || storedSearchCriteria.location || '',
      startTime: queryParams.get('startTime') || storedSearchCriteria.startTime || '0',
      endTime: queryParams.get('endTime') || storedSearchCriteria.endTime || '0',
    };

    setSearchCriteria(params);
  }, [location.search, setSearchCriteria]);

  useEffect(() => {
    localStorage.setItem('searchCriteria', JSON.stringify(searchCriteria));
  }, [searchCriteria]);

  useEffect(() => {
    const formatDateTimeDisplay = () => {
      if (searchCriteria.startDate && searchCriteria.endDate) {
        const startDateTime = new Date(searchCriteria.startDate);
        const endDateTime = new Date(searchCriteria.endDate);
        return `${startDateTime.toLocaleString()} - ${endDateTime.toLocaleString()}`;
      }
      return '';
    };
    setDateTimeDisplay(formatDateTimeDisplay());
  }, [searchCriteria.startDate, searchCriteria.endDate]);

  const handleLocationChange = async (e) => {
    const location = e.target.value;
    setSearchCriteria((prev) => ({ ...prev, location }));

    if (location.length > 2) {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const location = suggestion.properties.formatted;
    setSearchCriteria((prev) => ({ ...prev, location }));
    setSuggestions([]);
  };

  const handleDateTimeDone = () => {
    const formatDateTime = (date, time) => {
      if (!date) return '';
      const [hours, minutes] = time.split(':').map(Number);
      const localDate = new Date(date);
      localDate.setHours(hours, minutes, 0, 0);
      return localDate;
    };

    const startDateTime = formatDateTime(searchCriteria.startDate, `${searchCriteria.startTime}:00`);
    const endDateTime = formatDateTime(searchCriteria.endDate, `${searchCriteria.endTime}:00`);

    if (startDateTime && endDateTime) {
      setDateTimeDisplay(`${startDateTime.toLocaleString()} - ${endDateTime.toLocaleString()}`);
    }
    setShowDateTimePicker(false);
  };

  const handleSearch = async () => {
    if (searchCriteria.startDate && searchCriteria.endDate && searchCriteria.location) {
      try {
        const formatDateTime = (date, time) => {
          if (!date) return '';
          const [hours, minutes] = time.split(':').map(Number);
          const localDate = new Date(date);
          localDate.setHours(hours, minutes, 0, 0);
          return localDate.toISOString();
        };

        const formattedStartDate = formatDateTime(searchCriteria.startDate, `${searchCriteria.startTime}:00`);
        const formattedEndDate = formatDateTime(searchCriteria.endDate, `${searchCriteria.endTime}:00`);

        const response = await fetch(
          `${API_BASE_URL}/api/cars/available?startDate=${formattedStartDate}&endDate=${formattedEndDate}&location=${encodeURIComponent(searchCriteria.location)}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setSearchCriteria((prev) => ({
          ...prev,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }));

        setCars(data);

        navigate(`/menu?startDate=${formattedStartDate}&endDate=${formattedEndDate}&location=${encodeURIComponent(searchCriteria.location)}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    } else {
      console.error('Please provide startDate, endDate, and location');
    }
  };

  return (
    <div className={`flex items-center rounded-lg relative space-x-0 ${isHome ? "p-2  w-full " : "w-7/12 "} ${isBooking ?"!w-full md:!w-7/12 ":""}`}>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Enter Location"
          className={` text-xs md:text-sm border border-gray-300 rounded-l-3xl w-full focus:outline-none focus:ring-neon-200 focus:border-neon-200 ${isHome ? "p-4" : "p-3 "} ${isBooking ? "p-3.5":""}`}
          value={searchCriteria.location || ''}
          onChange={handleLocationChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-10 w-full bg-white border rounded shadow-lg z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.properties.place_id}
                className="p-4 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Select Date and Time"
          className={`text-xs md:text-sm border w-full border-gray-300 focus:outline-none focus:ring-neon-200 focus:border-neon-200 ${isHome ? "p-4" : "p-3"} ${isBooking ? "p-3.5":""}`}
          value={dateTimeDisplay}
          onFocus={() => setShowDateTimePicker(true)}
          readOnly
        />
        {showDateTimePicker && (
          <div className="absolute top-16 left-0 right-0 bg-white p-2 rounded-lg shadow-lg flex flex-col space-y-2 text-sm">
            <div className="flex flex-col lg:flex-row  justify-between space-x-2">
              <DatePicker
                selected={searchCriteria.startDate}
                onChange={(date) => setSearchCriteria((prev) => ({ ...prev, startDate: date }))}
                selectsStart
                startDate={searchCriteria.startDate}
                endDate={searchCriteria.endDate}
                placeholderText="Start Date"
                className="p-1 text-xs md:text-sm border border-gray-300 rounded w-24 md:w-full focus:outline-none focus:ring-neon-200 focus:border-neon-200"
              />
              <DatePicker
                selected={searchCriteria.endDate}
                onChange={(date) => setSearchCriteria((prev) => ({ ...prev, endDate: date }))}
                selectsEnd
                startDate={searchCriteria.startDate}
                endDate={searchCriteria.endDate}
                placeholderText="End Date"
                className="p-1 text-xs md:text-sm border border-gray-300 rounded w-24 md:w-full focus:outline-none focus:ring-neon-200 focus:border-neon-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-xs md:text-sm">Start Time</label>
              <input
                type="range"
                min="0"
                max="12"
                value={searchCriteria.startTime}
                onChange={(e) => setSearchCriteria((prev) => ({ ...prev, startTime: e.target.value }))}
                className="w-full accent-neon-200"
              />
              <span className="text-xs md:text-sm">{searchCriteria.startTime}:00</span>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-xs md:text-sm">End Time</label>
              <input
                type="range"
                min="0"
                max="12"
                value={searchCriteria.endTime}
                onChange={(e) => setSearchCriteria((prev) => ({ ...prev, endTime: e.target.value }))}
                className="w-full accent-neon-200"
              />
              <span className="text-xs md:text-sm">{searchCriteria.endTime}:00</span>
            </div>
            <button
              className="p-1 bg-neon-200 text-white rounded text-xs md:text-sm"
              onClick={handleDateTimeDone}
            >
              Done
            </button>
          </div>
        )}
      </div>
      <button className={` bg-neon-200 text-white rounded-r-3xl w-1/3 text-xs md:text-sm hover:bg-neon-100 duration-300 ${isHome ? "p-4":"p-3"} ${isBooking ? "p-3.5":""}`}
      onClick={handleSearch}>
         {isBooking ? "update": "Get Car"}
      </button>
    </div>
  );
};

export default SearchComponent;
