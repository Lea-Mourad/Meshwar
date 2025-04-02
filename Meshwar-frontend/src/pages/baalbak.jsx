import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";
import LocationsList from "../components/LocationsList";

const Baalbek = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["HISTORICAL", "RESTAURANTS", "COFFEE_SHOPS", "HOTELS"];

  const categoryImages = {
    HISTORICAL: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Roman-Ruins-Lebanon-1.jpg')",
    RESTAURANTS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Restaurants-Lebanon-1.jpg')",
    COFFEE_SHOPS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Coffee-Shops-Lebanon-1.jpg')",
    HOTELS: "url('https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Hotels-Lebanon-1.jpg')",
  };

  const images = [
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Roman-Ruins-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Restaurants-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Coffee-Shops-Lebanon-1.jpg",
    "https://www.lebanoninapicture.com/Prv/Images/Pages/Page_1/Baalbek-Hotels-Lebanon-1.jpg",
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
            <img src={src} alt={`Baalbek ${index + 1}`} className="w-full h-screen object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrollable Content */}
      <div className="flex flex-col items-center justify-start">
        {/* Title */}
        <h1 className="text-6xl font-extrabold text-[#B24F4F] mt-6 tracking-wide" style={{ fontFamily: "'Pathway', sans-serif" }}>
          BAALBEK
        </h1>

        {/* Description */}
        <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
            Baalbek, home to some of the most impressive Roman ruins in the world, is a city steeped in ancient history and cultural significance.
            The Temple of Jupiter, Temple of Bacchus, and Temple of Venus stand as magnificent testaments to Roman engineering and architecture.
            The city's rich heritage, combined with its modern amenities and warm hospitality, makes it a fascinating destination for history
            enthusiasts and cultural explorers alike.
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
            <LocationsList city="Baalbek" category={selectedCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Baalbek;