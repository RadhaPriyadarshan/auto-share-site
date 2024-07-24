import PropTypes from 'prop-types';

const Card = ({ car,onClick }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-white " onClick={onClick} >
      <img
        className="w-full h-54 object-cover"
        src={car.imgSrc}
        alt={car.imgAlt}
      />
      <div className="px-3 py-4">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {car.title}
          </h5>
          <div className="flex gap-1">
            {car.features.map((feature, index) => (
              <p
                key={index}
                className="text-[13px] text-gray-500 dark:text-gray-400"
              >
                {index > 0 && <>&bull;</>} {feature}
              </p>
            ))}
          </div>
        </a>
        <div className="my-4 py-1 px-2 bg-gray-100 rounded-3xl flex items-center">
          <svg
            className="h-5 w-5 text-neon-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-3 mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-800">
            {car.rating}
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            &bull;
          </span>
          <span className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {car.trips} Trips
          </span>
        </div>
        <hr className="-mx-3 mb-4"></hr>
        <div className="mb-5 ml-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{car.price}
          </span>
        </div>
        <div className="mb-2 flex items-center gap-3">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded px-2.5 py-0.5 text-[10px] ${
                tag === "FASTAG"
                  ? "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-800"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
Card.propTypes = {
  car: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string,
    title: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    trips: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired, 
};