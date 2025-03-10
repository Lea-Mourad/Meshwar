
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Header from "../components/header";
export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const [selectedCity, setSelectedCity] = useState("Beirut");
  const [favorites, setFavorites] = useState({});
  // Fetch favorite places from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);
  // if (!isAuthenticated) {
  //   return <Navigate to="/loginpage" />;
  // }
  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Tyre", "Jounieh"];
  // Handle go back button click
  const handleGoBack = () => {
    window.location.href = "/";
  };
  // Handle remove favorite
  const handleRemoveFavorite = (place) => {
    const updatedFavorites = { ...favorites };
    updatedFavorites[selectedCity] = updatedFavorites[selectedCity].filter(
      (favorite) => favorite !== place
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };
  return (
    <div className="relative h-screen bg-gray-50">
         <Header />
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-6 p-3 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
      </button>
      <div className="absolute top-16 left-6 p-6 sm:left-12 sm:top-24 lg:left-24 lg:top-28 w-full sm:w-auto">
        <h2 className="text-3xl font-extrabold text-[#984942] mb-6 sm:text-4xl">Favorites</h2>
        {/* City Buttons (Responsive) */}
        <div className="flex space-x-4 mb-4 overflow-x-auto sm:space-x-6 sm:mb-6">
          {cities.map((city) => (
            <button
              key={city}
              className={`px-8 py-4 text-lg sm:text-xl w-32 sm:w-40 rounded-full border transition-all ${
                selectedCity === city
                  ? "bg-[#984942] text-white border-[#984942]"
                  : "bg-white text-[#984942] border-gray-300"
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
        {/* Favorite Places List (Responsive) */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm sm:p-6 lg:p-8">
          <p className="text-gray-500 text-sm sm:text-base">Favorite places in {selectedCity} will appear here.</p>
          <ul className="mt-4 space-y-2 sm:space-y-4">
            {favorites[selectedCity] && favorites[selectedCity].length > 0 ? (
              favorites[selectedCity].map((place) => (
                <li key={place} className="flex justify-between items-center text-sm sm:text-base">
                  <span>{place}</span>
                  <button
                    onClick={() => handleRemoveFavorite(place)}
                    className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-xs sm:text-sm">No favorite places added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}