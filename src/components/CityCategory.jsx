import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";  
import PlaceCard from "../components/placeCard";
import Header from "./header";
import ListingDetails from "../data/ListingDetails";

const CityCategory = () => {
  const { city, category } = useParams();
  const [cityPlacesData, setCityPlacesData] = useState([]);


  return (
    <div className="w-full min-h-screen bg-[#F5E3C1] bg-opacity-70"> 
      <Header />

      {/* Category Title */}
      <h2 className="text-4xl font-bold text-center mt-20 pt-8"
        style={{ fontFamily: "'Pathway', sans-serif", color: "#B24F4F" }}>
        {cityPlacesData.length > 0 ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : `No ${category} Found`}
      </h2>

      {/* Grid of Place Cards */}
      <div className="w-full mt-12 mx-auto px-6 sm:px-10 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 justify-center">
          {cityPlacesData.length > 0 ? (
            cityPlacesData.map((place) => (
              <Link key={place.id} to={`/locations/${place.id}`}>
                <PlaceCard place={place} />
              </Link>
            ))
          ) : (
            <div className="text-lg text-gray-600 text-center">
              No places found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityCategory;
