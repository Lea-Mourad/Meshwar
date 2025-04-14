import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "../components/header";
import PlaceCard from "../components/placeCard";
import { getFavorites } from "../services/favoritesService";

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const [selectedCity, setSelectedCity] = useState("Beirut");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Balbbek", "Jounieh"];

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      setError("Failed to fetch favorites. Please try again later.");
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative min-h-screen bg-gray-50 pb-10">
      <Header />

      <button
        onClick={handleGoBack}
        className="absolute top-8 left-6 p-3 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
      </button>

      <div className="pt-32 px-6 sm:px-12 lg:px-24">
        <h2 className="text-3xl font-extrabold text-[#984942] mb-6 sm:text-4xl">
          Favorites
        </h2>

        {/* City filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-2 rounded-full border text-sm sm:text-base ${
                selectedCity === city
                  ? "bg-[#984942] text-white border-[#984942]"
                  : "bg-white text-[#984942] border-gray-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#984942] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your favorites...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : (
          /* Favorite Places List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.length > 0 ? (
              favorites
                .filter((place) => place.location.city === selectedCity.toUpperCase())
                .map((favorite) => (
                  <PlaceCard
                    key={favorite.id}
                    place={favorite.location}
                    refreshFavorites={fetchFavorites}
                  />
                ))
            ) : (
              <p className="text-gray-400 text-sm sm:text-base col-span-full">
                No favorite places added yet in {selectedCity}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
