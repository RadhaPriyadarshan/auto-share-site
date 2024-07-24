import PropTypes from 'prop-types';
import Card from "./Card";
import { useContext } from 'react';
import { CarContext } from '../contexts/CarContext';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const { cars, filteredCars, filterStatus } = useContext(CarContext);
  const dataToDisplay = filterStatus ? filteredCars : cars;
  const navigate = useNavigate();
  const handleCardClick = (car) => {
    navigate('/booking', { state: { car } });
  };
  if (!Array.isArray(cars)) {
    console.error("Expected 'cars' to be an array");
    return null;
  }

  return (
    <div className="flex-1 overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-44">
      {dataToDisplay.length > 0 ? (
          dataToDisplay.map((car, index) => (
            <Card key={index} car={car} onClick={() => handleCardClick(car)} />
          ))
        )  : (
          <p className="text-center col-span-full">No cars available</p>
        )}
      </div>
    </div>
  );
};


CarList.propTypes = {
  cars: PropTypes.array
};

export default CarList;
