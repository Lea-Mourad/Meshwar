import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";  // Import heart icon

const PlaceCard = ({ place, city, category }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the place is marked as favorite


  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle the favorite state
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 hover:transform hover:translate-y-2 transition-transform duration-300">
      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {/* Heart button to toggle favorite */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <FaHeart size={24} color={isFavorite ? "red" : "gray"} />
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mt-4 text-gray-800">{place.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{place.description}</p>
      
      <div className="flex justify-center gap-4 mt-4">
        {place.website && (
          <a
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Visit Website
          </a>
        )}
        {place.instagram && (
          <a
            href={place.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600"
          >
            Visit Instagram
          </a>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
