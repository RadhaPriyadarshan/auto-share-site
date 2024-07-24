import { createContext, useState } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]); 
  const [filteredCars, setFilteredCars] = useState([]); 
  const [filterStatus, setFilterStatus] = useState(false); 

  return (
    <CarContext.Provider value={{ cars, setCars, filteredCars, setFilteredCars, filterStatus, setFilterStatus }}>
      {children}
    </CarContext.Provider>
  );
};
