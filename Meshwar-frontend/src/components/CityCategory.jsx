
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Ensure to import useParams
import PlaceCard from "../components/placeCard";
import beirutPlacesData from "../data/beirutPlacesData";
import sidonPlacesData from "../data/sidonPlacesData";
import baalbekPlacesData from "../data/baalbakPlacesData";
import batrounPlacesData from "../data/batrounPlacesData";
import byblosPlacesData from "../data/byblosPlacesData";
import sourPlacesData from "../data/sourPlacesData";
import Header from "./header";

// Define a static mapping for city data
const cityDataMap = {
  beirut: beirutPlacesData,
  sidon: sidonPlacesData,
  batroun: batrounPlacesData,
  byblos:byblosPlacesData,
  sour: sourPlacesData,
  baalbek: baalbekPlacesData
};

const CityCategory = () => {
  const { city, category } = useParams();  // Get both city and category from the URL

  const [cityPlacesData, setCityPlacesData] = useState([]);

  useEffect(() => {
    if (cityDataMap[city]) {
      setCityPlacesData(cityDataMap[city]);  // Set the city-specific data from the map
    } else {
      console.error("City data not found:", city);
      setCityPlacesData([]);  // Empty array if city data is not found
    }
  }, [city]);

  // Filter places by category, making sure both are compared in lowercase to avoid case sensitivity issues
  const filteredPlaces = cityPlacesData.filter(
    (place) => place.category && place.category.toLowerCase() === category.toLowerCase()
  );

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


