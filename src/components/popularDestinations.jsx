import React from "react";

const destinations = [
  { name: "Beirut", image: "https://i.pinimg.com/736x/82/93/11/829311250ac97fec6a3594431fe2e6d5.jpg", description: "Nightlife, Zaitunay Bay, Museums" },
  { name: "Byblos", image: "https://i.pinimg.com/474x/cf/66/21/cf6621f19ed1f3a4f8e840410a1b0008.jpg", description: "Ancient ruins, souks" },
  { name: "Baalbek", image: "https://i.pinimg.com/474x/73/8a/9d/738a9d7d4300d56cecaf687fb3fdea16.jpg", description: "Roman temples" },
  { name: "Jeita Grotto", image: "https://i.pinimg.com/474x/a8/68/76/a8687688c6cce5ab8f03f2c648f1f6e4.jpg", description: "Caves & natural wonders" },
  { name: "Cedars of God", image: "https://i.pinimg.com/474x/3c/b5/f8/3cb5f8f586f5146e47cffdf4afc50ce3.jpg", description: "UNESCO-listed nature" },
  { name: "Tyre", image: "https://i.pinimg.com/474x/96/f9/c4/96f9c4f744aa6c6aca86c27e242b7c2e.jpg", description: "Beach towns" },
];

const DestinationGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#984949]">Popular Destinations</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((place, index) => (
          <div key={index} className="relative group">
            <img src={place.image} alt={place.name} className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold text-white">{place.name}</h3>
              <p className="text-sm text-gray-300">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationGrid;
