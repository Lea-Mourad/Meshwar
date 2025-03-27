import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Beirut = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Museums", "Restaurants", "Beaches", "Coffee Shops", "Hotels", "Arcades", "Night Life"];

  const categoryImages = {
    Museums: "url('https://www.wilmotte.com/wp-content/uploads/2023/03/hr_museebeyrouth_marwanharmouche_04-scaled.jpg')",
    Restaurants: "url('https://i.pinimg.com/736x/a2/de/5d/a2de5d984e8cd466a119858cf407b622.jpg')",
    Beaches: "url('https://libshop.fr/wp-content/uploads/2020/04/beyrouth-beach-lebanon-scaled-1.jpg')",
    "Coffee Shops": "url('https://georgerishan.wordpress.com/wp-content/uploads/2021/04/img_4408.jpg?w=936')",
    Hotels: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/48/bb/91/kempinski-summerland.jpg?w=1200&h=-1&s=1')",
    Arcades: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYcNyC7YD23auPAqFpEjtEKOrDmlFqg5ASLg&s')",
    "Night Life": "url('https://248am.com/images/2015/04/grandfactory.jpg')",
  };const images = [
    "https://lp-cms-production.imgix.net/2020-12/shutterstockRF_756972694.jpg",
    "https://img.travelnaut.com/web/db/photose/location/as/lb/beirut/a8f769f130642d7a50f738c3dc965492.jpeg?format=webp&width=3840&quality=75",
    "https://www.hospitalitynewsmag.com/wp-content/uploads/2020/01/Zaytouna-Bay-at-Sunset-Beirut-Downtown.jpg",
    "https://images.ajar.casa/wp-content/uploads/2022/05/16015058/Ruins-in-Beirut-Downtown-near-Martyrs-Square.jpg",
  ];


  // Handle navigation for category selection
  const handleCategoryClick = (category) => {
    const cityName = "beirut";  // Hardcoded city name for the Beirut page
    navigate(`/${cityName}/${category}`);  // Navigate to the city/category path
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
            <img src={src} alt={`Lebanon ${index + 1}`} className="w-full h-screen object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrollable Content */}
      <div className="flex flex-col items-center justify-start">
          {/* Title */}
          <h1 className="text-6xl font-extrabold text-[#B24F4F] mt-6 tracking-wide" style={{ fontFamily: "'Pathway', sans-serif" }}>
            BEIRUT
          </h1>
          

          {/* Description */}
          <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md ">
            <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
              Beirut, the vibrant capital of Lebanon, is a city rich in history, culture, and breathtaking views. From its bustling
              souks to the serene Mediterranean coastline, Beirut offers a unique blend of tradition and modernity. The city stands
              as a testament to resilience, having withstood centuries of change and transformation. Whether exploring the lively
              streets of Gemmayze, admiring the Roman ruins of downtown, or enjoying the coastal beauty of Raouché, Beirut captivates
              visitors with its charm and diversity. It is a city where past and future intertwine, creating a unique and
              unforgettable experience for all who walk its streets.
            </p>
          </div>

         
        {/* Categories */}
        <div className="w-full max-w-5xl mt-10 p-6 flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <button
              key={category}
              className="w-72 h-48 relative flex items-center justify-center rounded-lg text-2xl font-semibold transition-all shadow-lg bg-cover bg-center text-white hover:scale-105 hover:shadow-2xl"
              style={{ backgroundImage: categoryImages[category] }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beirut;
