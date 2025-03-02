

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function FavoritesPage() {

  const [selectedCity, setSelectedCity] = useState("Beirut");

  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Tyre", "Jounieh"];
   const handleGoBack=()=>{
  window.location.href="/";
   };
  return (
    <div className=" relative h-screen"> 
    <button
     onClick={handleGoBack}
     className="absolute top-8 left-6 p-3 bg whilte rounded-full shadow-md hover:bg-gray-200 transition-all"
   
   >
       <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
   </button>
 
      <div className="absolute top-16 left-6 p-6">
        <h2 className="text-3xl font-extrabold text-[#984942] mb-6">Favorites</h2>

       
        <div className="flex space-x-4 mb-4 overflow-x-auto">
          {cities.map((city) => (
            <button
              key={city}
              className={`px-8 py-4 text-lg w-48 rounded-full border transition-all ${
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

       
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <p className="text-gray-500">Favorite places in {selectedCity} will appear here.</p>
        </div>
      </div>
    </div>
  );
}
