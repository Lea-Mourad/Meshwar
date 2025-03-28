import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Header from "../components/header";
import PlaceCard from "../components/placeCard";

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const [selectedCity, setSelectedCity] = useState("Beirut");
  const [favorites, setFavorites] = useState([]);

  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Balbbek", "Jounieh"];

  const fetchFavorites = async () => {
    const token = localStorage.getItem("authToken");
    const API_BASE = "http://127.0.0.1:8000";
    const listURL = `${API_BASE}/auth/favorites/list/?city=${selectedCity}`;

    try {
      const response = await fetch(listURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [selectedCity]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

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

        {/* Favorite Places List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.length > 0 ? (
            favorites.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                favorites={favorites}
                refreshFavorites={fetchFavorites}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm sm:text-base col-span-full">
              No favorite places added yet in {selectedCity}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
