import { useEffect, useContext } from "react";
import MenuNav from "../components/MenuNav";
import Filter from "../components/Filter";
import CarCards from "../components/CarCards";
import { useLocation } from 'react-router-dom';
import { CarContext } from "../contexts/CarContext";
import { API_BASE_URL } from '../config';
export default function Menu() {
  
  const { cars,setCars } = useContext(CarContext);
  const location = useLocation();
  

  useEffect(() => {
    const fetchCars = async () => {
      const queryParams = new URLSearchParams(location.search);
      const startDate = queryParams.get('startDate');
      const endDate = queryParams.get('endDate');
      const locationParam = queryParams.get('location');

      if (startDate && endDate && locationParam) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/cars/available?startDate=${startDate}&endDate=${endDate}&location=${encodeURIComponent(locationParam)}`
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setCars(data);

        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };

    fetchCars();
  }, [location.search, setCars]);
  return (
    <>
    <div className="h-screen overflow-hidden">
      <MenuNav />
      <div className=" bg-gray-100 flex h-screen ">
        <Filter />
        <div className="flex flex-col mt-3 p-0 w-full">
        <CarCards cars={cars}/>
        <div className="bg-white h-36 "></div>
       </div>

      </div>
    </div>
    </>
  );
}
