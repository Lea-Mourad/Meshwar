import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; // Import heart icon
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../services/favoritesService";

const PlaceCard = ({ place, refreshFavorites }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the place is marked as favorite

  useEffect(() => {
    // Check if the place is in favorites when component mounts
    const checkFavoriteStatus = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch("https://meshwar-backend.onrender.com/favorites/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          const data = await response.json();
          setIsFavorite(data.some(fav => fav.location.id === place.id));
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };
    checkFavoriteStatus();
  }, [isAuthenticated, place.id]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent the favorite button click from triggering the card click
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        await removeFromFavorites(place.id);
      } else {
        await addToFavorites(place.id);
      }
      setIsFavorite(!isFavorite);
      if (refreshFavorites) {
        refreshFavorites();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleCardClick = () => {
    if (isAuthenticated) {
      navigate("/favorites");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-8 w-96 h-[510px] hover:transform hover:translate-y-2 transition-transform duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* Updated Image with Bigger Size */}
        <img
          src={place.image_url || place.image}
          alt={place.name}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      {/* Name and Heart Icon next to each other */}
      <div className="flex items-center mt-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-grow">{place.name}</h3>
        <button
          onClick={handleFavoriteClick}
          className="text-red-500 hover:text-red-700"
        >
          <FaHeart size={24} color={isFavorite ? "red" : "gray"} />
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-2">{place.description}</p>
    </div>
  );
};

export default PlaceCard;
