import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";
import LocationsList from "../components/LocationsList";

const Byblos = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["HISTORICAL", "RESTAURANTS", "BEACHES", "COFFEE_SHOPS", "HOTELS", "NIGHTLIFE"];

  const categoryImages = {
    HISTORICAL: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Historical-Sites-Lebanon-1.jpg')",
    RESTAURANTS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Restaurants-Lebanon-1.jpg')",
    BEACHES: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Beaches-Lebanon-1.jpg')",
    COFFEE_SHOPS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Coffee-Shops-Lebanon-1.jpg')",
    HOTELS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Hotels-Lebanon-1.jpg')",
    NIGHTLIFE: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Nightlife-Lebanon-1.jpg')",
  };

  const images = [
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Historical-Sites-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Restaurants-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Beaches-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Coffee-Shops-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Byblos-Hotels-Lebanon-1.jpg",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full overflow-auto bg-[#F5E3C1] bg-opacity-60">
      <Header />

      {/* Slideshow */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-screen"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img src={src} alt={`Byblos ${index + 1}`} className="w-full h-screen object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrollable Content */}
      <div className="flex flex-col items-center justify-start">
        {/* Title */}
        <h1 className="text-6xl font-extrabold text-[#B24F4F] mt-6 tracking-wide" style={{ fontFamily: "'Pathway', sans-serif" }}>
          BYBLOS
        </h1>

        {/* Description */}
        <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
            Byblos, one of the oldest continuously inhabited cities in the world, is a UNESCO World Heritage site that perfectly
            blends ancient history with modern charm. The city's archaeological sites, including the Phoenician temples and Roman
            amphitheater, tell stories of its rich past. The picturesque harbor, traditional souks, and beautiful beaches make
            Byblos a perfect destination for both history enthusiasts and beach lovers. The city's unique charm lies in its
            ability to preserve its historical treasures while embracing modern Lebanese culture.
          </p>
        </div>

        {/* Categories */}
        <div className="w-full max-w-5xl mt-10 p-6 flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`w-72 h-48 relative flex items-center justify-center rounded-lg text-2xl font-semibold transition-all shadow-lg bg-cover bg-center text-white hover:scale-105 hover:shadow-2xl ${
                selectedCategory === category ? 'ring-4 ring-[#984949]' : ''
              }`}
              style={{ backgroundImage: categoryImages[category] }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Locations List */}
        {selectedCategory && (
          <div className="w-full mt-8">
            <LocationsList city="Byblos" category={selectedCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Byblos;
