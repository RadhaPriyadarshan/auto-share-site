import { useState, useContext, useEffect } from "react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaSort,
  FaCar,
  FaStar,
  FaGasPump,
  FaCogs,
  FaUserFriends,
  FaTruck,
  FaTags,
} from "react-icons/fa";
import { CarContext } from "../contexts/CarContext";

export default function Filter() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState({
    sortBy: "",
    transmission: "",
    seats: "",
    carType: "",
    ratings: "",
    deliveryType: "",
    fuelType: "",
    addons: "",
  });

  const { cars, setFilteredCars, setFilterStatus, filterStatus } =
    useContext(CarContext);

  const handleFilterChange = (category, value) => {
    setSelectedFilter((prev) => ({ ...prev, [category]: value }));
    setFilterStatus(true); // Set filter status to true when filter changes
  };

  const handleResetFilters = () => {
    setSelectedFilter({
      sortBy: "",
      transmission: "",
      seats: "",
      carType: "",
      ratings: "",
      deliveryType: "",
      fuelType: "",
      addons: "",
    });
    setFilteredCars(cars);
    setFilterStatus(false); // Reset filter status
  };

  useEffect(() => {
    if (filterStatus) {
      const filterCars = () => {
        let result = [...cars];

        for (const [category, value] of Object.entries(selectedFilter)) {
          if (value) {
            console.log(`Filtering by ${category}: ${value}`);
            switch (category) {
              case "sortBy":
                result = applySort(result, value);
                break;
              case "transmission":
                result = result.filter((car) => car.features.includes(value));
                break;
              case "seats":
                result = result.filter((car) => {
                  const seatOptions = value
                    .split("/")
                    .map((option) => option.trim());
                  return seatOptions.some((option) =>
                    car.features.includes(option)
                  );
                });
                break;
              case "carType":
                result = result.filter((car) => car.vehicleType === value);
                break;
              case "ratings":
                const ratingThresholds = {
                  "4.5+ Rated": 4.5,
                  "4.2+ Rated": 4.2,
                  "4+ Rated": 4,
                  "3.5+ Rated": 3.5,
                  "3+ Rated": 3,
                  All: 0,
                };
                const minRating = ratingThresholds[value];
                result = result.filter(
                  (car) => minRating === 0 || car.rating >= minRating
                );
                break;
              case "deliveryType":
                const deliveryTypeLower = value.toLowerCase();
                result = result.filter(
                  (car) =>
                    car.tags &&
                    car.tags.some(
                      (tag) => tag.toLowerCase() === deliveryTypeLower
                    )
                );
                break;
              case "fuelType":
                result = result.filter((car) => car.features.includes(value));
                break;
              case "addons":
                const addonsLower = value.toLowerCase();
                result = result.filter(
                  (car) =>
                    car.tags &&
                    car.tags.some((tag) => tag.toLowerCase() === addonsLower)
                );
                break;
              default:
                break;
            }
          }
        }
        console.log("Filtered result:", result);
        setFilteredCars(result);
      };

      filterCars();
    }
  }, [selectedFilter, cars, filterStatus]);

  const applySort = (cars, sortBy) => {
    switch (sortBy) {
      case "Relevance":
        return cars; // Default order
      case "Ratings - High to Low":
        return cars.sort((a, b) => b.rating - a.rating);
      case "Price - Low to High":
        return cars.sort((a, b) => a.price - b.price);
      case "Price - High to Low":
        return cars.sort((a, b) => b.price - a.price);
      default:
        return cars;
    }
  };

  return (
    <div className={`pt-3 ${showFilters ? "w-80" : "w-11"} h-full`}>
      <button
        className={`p-2 bg-neon-200 text-white rounded-tr-lg hover:bg-neon-100 duration-300 flex justify-center items-center ${
          showFilters ? "w-full" : "w-full"
        }`}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? (
          <>
            <h1 className="pr-2">Filters</h1>
            <FaAngleDoubleLeft />
          </>
        ) : (
          <FaAngleDoubleRight />
        )}
      </button>
      {showFilters && (
        <div className="p-4 pb-52 bg-white rounded-r-lg shadow-lg h-screen overflow-y-scroll">
          {/* Sort By */}
          <div className="mb-4">
            <label className="block text-gray-700 flex justify-between items-center mb-2">
              <FaSort className="mr-2" />
              Sort By
              <button
                className="ml-auto border-none border px-2 py-1 rounded flex items-center"
                onClick={handleResetFilters}
              >
                RESET
              </button>
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "Relevance",
                "Ratings - High to Low",
                "Price - Low to High",
                "Price - High to Low",
              ].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.sortBy === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("sortBy", option)}
                >
                  <FaSort className="mr-2 text-gray-700" />
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaCogs className="mr-2" />
              Transmission
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Manual", "Automatic"].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.transmission === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("transmission", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Seats */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaUserFriends className="mr-2" />
              Seats
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {["4/5 Seater", "6/7 Seater"].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.seats === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("seats", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Car Type */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaCar className="mr-2" />
              Car Type
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Hatchback", "Sedan", "SUV", "Luxury"].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.carType === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("carType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaStar className="mr-2" />
              Ratings
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "4.5+ Rated",
                "4.2+ Rated",
                "4+ Rated",
                "3.5+ Rated",
                "3+ Rated",
                "All",
              ].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.ratings === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("ratings", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Type */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaTruck className="mr-2" />
              Delivery Type
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Home Delivery", "Airport Delivery"].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.deliveryType === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("deliveryType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaGasPump className="mr-2" />
              Fuel Type
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Petrol", "Diesel", "Electric"].map((option, idx) => (
                <button
                  key={idx}
                  className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                    selectedFilter.fuelType === option
                      ? "bg-neon-200 text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("fuelType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Addons */}
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center mb-2">
              <FaTags className="mr-2" />
              Addons
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                className={`border-gray-300 border px-2 py-1 rounded flex items-center ${
                  selectedFilter.addons === "FASTag"
                    ? "bg-neon-200 text-white"
                    : ""
                }`}
                onClick={() => handleFilterChange("addons", "FASTag")}
              >
                Active FASTag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
