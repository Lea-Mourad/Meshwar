import React from "react";
import { useParams } from "react-router-dom";
import PlaceCard from "../components/placeCard";
import placesData from "../data/placesData"; // Importing sample data
import Header from "./header";

const CityCategory = () => {
  const { category } = useParams(); // Get the category from the URL (e.g., 'museums')
  
  // Filter placesData by category (make both category and place category lowercase to match)
  const filteredPlaces = placesData.filter(place => place.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="w-full min-h-screen bg-[#F5E3C1]"> {/* Set the background color on the outer div */}
      <Header />

      {/* Category Title */}
      <h2 className="text-4xl font-bold text-center mt-20 pt-8"
      style={{ fontFamily: "'Pathway', sans-serif", color: "#B24F4F" }}>
        {filteredPlaces.length > 0 ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : `No ${category} Found`}
      </h2>

      {/* Grid of Place Cards */}
      <div className="w-full mt-12 mx-auto px-6 sm:px-10 md:px-20">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-center">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))
          ) : (
            <div className="text-lg text-gray-600 text-center">
              No places found in this category. Here are some sample places:
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityCategory;
