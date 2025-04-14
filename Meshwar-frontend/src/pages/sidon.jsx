import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { addToFavorites, removeFromFavorites } from "../services/favoritesService";

const Sidon = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const categories = [
    { value: "HISTORICAL", label: "Historical Sites" },
    { value: "RESTAURANT", label: "Restaurants" },
    { value: "BEACH", label: "Beaches" },
    { value: "COFFEE", label: "Coffee Shops" },
    { value: "HOTEL", label: "Hotels" },
    { value: "NIGHTLIFE", label: "Night Life" },
    { value: "MUSEUM", label: "Museums" },
    { value: "ACTIVITY", label: "Activities" }
  ];

  const categoryImages = {
    HISTORICAL: "url('https://example.com/historical.jpg')",
    RESTAURANT: "url('https://example.com/restaurant.jpg')",
    // ... other category images ...
  };

  const cityImages = [
    "https://example.com/sidon1.jpg",
    "https://example.com/sidon2.jpg",
    // ... other city images ...
  ];

  // Fetch favorites immediately if authenticated
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

  // Fetch locations separately
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://meshwar-backend.onrender.com/locations/?city=SIDON`
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
  }, []);

  const handleCategoryClick = (categoryValue) => {
    navigate(`/sidon/${categoryValue.toLowerCase()}`);
  };

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
        // Immediately update the local state with the new favorite
        const location = locations.find(loc => loc.id === locationId);
        if (location) {
          setFavorites([...favorites, { location }]);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const getLocationsByCategory = (category) => {
    return locations.filter(loc => loc.category === category);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full overflow-auto bg-[#F5E3C1] bg-opacity-60">
      <Header />

      {/* City Image Slideshow */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-screen"
      >
        {cityImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`Sidon ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* City Title */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-[#B24F4F]">
          SIDON
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          A historic coastal city with ancient charm
        </p>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryLocations = getLocationsByCategory(category.value);
            if (categoryLocations.length === 0) return null;
            
            return (
              <div key={category.value} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Category Header */}
                <div 
                  className="h-48 bg-cover bg-center flex items-center justify-center relative"
                  style={{ backgroundImage: categoryImages[category.value] }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <h2 className="text-2xl font-bold text-white relative z-10">
                    {category.label}
                  </h2>
                </div>

                {/* Locations List */}
                <div className="p-4">
                  {categoryLocations.map(location => {
                    const isFavorite = favorites.some(fav => fav.location.id === location.id);
                    return (
                      <div 
                        key={location.id} 
                        className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer relative"
                        onClick={() => navigate(`/location/${location.id}`)}
                      >
                        <button
                          onClick={(e) => handleFavoriteClick(e, location.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 z-10"
                          disabled={favoritesLoading}
                        >
                          {favoritesLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                          ) : (
                            <FaHeart size={20} color={isFavorite ? "red" : "gray"} />
                          )}
                        </button>
                        <h3 className="font-bold text-lg">{location.name}</h3>
                        <p className="text-gray-600">{location.address}</p>
                        {location.image_url && (
                          <img 
                            src={location.image_url} 
                            alt={location.name}
                            className="mt-2 w-full h-32 object-cover rounded"
                          />
                        )}
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {location.current_people}/{location.max_people} people
                          </span>
                          <span className="text-sm font-semibold">
                            {Array(location.cost_range).fill('$').join('')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidon;