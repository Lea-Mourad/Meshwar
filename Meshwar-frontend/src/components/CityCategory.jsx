import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaHeart } from "react-icons/fa";
import Header from "./header";
import { addToFavorites, removeFromFavorites } from "../services/favoritesService";

const CityCategory = () => {
  const { city, category } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // Fetch favorites if authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;
      setFavoritesLoading(true);
      try {
        const response = await fetch("https://meshwar-backend.onrender.com/favorites/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setFavoritesLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // Fetch locations for the specific city and category
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://meshwar-backend.onrender.com/locations/?city=${city.toUpperCase()}&category=${category.toUpperCase()}`
        );
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [city, category]);

  const handleFavoriteClick = async (e, locationId) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.location.id === locationId);
      if (isCurrentlyFavorite) {
        await removeFromFavorites(locationId);
        setFavorites(favorites.filter(fav => fav.location.id !== locationId));
      } else {
        await addToFavorites(locationId);
        const location = locations.find(loc => loc.id === locationId);
        if (location) {
          setFavorites([...favorites, { location }]);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-[#984942] mb-8 capitalize">
          {category} in {city}
        </h1>

        {locations.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No places found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map(location => {
              const isFavorite = favorites.some(fav => fav.location.id === location.id);
              return (
                <div 
                  key={location.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/location/${location.id}`)}
                >
                  {location.image_url && (
                    <img 
                      src={location.image_url} 
                      alt={location.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">{location.name}</h2>
                      <button
                        onClick={(e) => handleFavoriteClick(e, location.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={favoritesLoading}
                      >
                        {favoritesLoading ? (
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                        ) : (
                          <FaHeart size={20} color={isFavorite ? "red" : "gray"} />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">{location.description}</p>
                    {location.address && (
                      <p className="text-gray-500 text-sm mt-2">{location.address}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityCategory;


