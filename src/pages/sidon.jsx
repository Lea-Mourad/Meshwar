import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Sidon = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
  
    const categories = ["Historical Sites", "Restaurants", "Beaches", "Coffee Shops", "Hotels", "Activities"];
  
    const categoryImages = {
      "Historical": "url('https://johtt.com/uploads/filemanager/Lebanon/Sid%20Sea%20Castle.jpg')",
      Restaurants: "url('https://media-cdn.tripadvisor.com/media/photo-s/18/c0/10/40/photo1jpg.jpg')",
      Beaches: "url('https://64.media.tumblr.com/7f13464ac6a489982b35a7152eec671f/tumblr_pw8elwZIS31rexkjko1_1280.jpg')",
      "Coffee Shops": "url('https://alkhabaragency.com/khbr-82148/130197771_1031711683969543_3261871058427221949_o')",
      Hotels: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/203321190.jpg?k=3dbde078b457769892ad43d75061b413610941b9c96caaf04d385b8d238f9e7c&o=&hp=1')",
      Activities: "url('https://visitsaida.com/wp-content/uploads/2021/07/Diving.jpg')",
    };
  
    const images = [
      "https://visitsaida.com/wp-content/uploads/2021/07/Old-Saida.jpg",
      "https://medcities.org/wp-content/uploads/2021/05/capcalera-saida.jpg",
      "https://visitsaida.com/wp-content/uploads/2021/07/shutterstock_1166766343-1170x780-2.jpg",
      "https://visitsaida.com/wp-content/uploads/2021/07/SAIDA-OLD-SOUK.jpg",
      "https://visitsaida.com/wp-content/uploads/2021/07/SAIDA-PUBLIC-BEACH.jpg",
    ];
  
    const handleCategoryClick = (category) => {
      const cityName = "sidon";  // Hardcoded city name for the Beirut page
      navigate(`/${cityName}/${category}`);  // Navigate to the city/category path
    };
    return (
    
        <div className="w-full overflow-auto bg-[#F5E3C1] bg-opacity-60">
        <Header />
  
        {/* Full-Screen Slideshow */}
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
              <img src={src} alt={`Sidon ${index + 1}`} className="w-full h-screen object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Scrollable Content */}
        <div className="flex flex-col items-center justify-start">
          {/* Title */}
          <h1 className="text-6xl font-extrabold text-[#B24F4F] mt-6 tracking-wide" style={{ fontFamily: "'Pathway', sans-serif" }}>
            SIDON
          </h1>
  
          {/* Description */}
          <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md ">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
              Sidon, one of Lebanon’s oldest and most storied cities, is a coastal gem steeped in history and tradition. 
              Known for its ancient Phoenician heritage, Sidon boasts landmarks such as the majestic Sea Castle, built by the Crusaders, 
              and the bustling Khan el-Franj, a testament to its rich trading past. The city’s vibrant souks offer a glimpse into daily 
              life, where the scent of spices and freshly baked sweets fills the air. Overlooking the Mediterranean, Sidon seamlessly
              blends its historical significance with a lively, welcoming atmosphere, making it a must-visit destination for those 
              seeking culture, history, and seaside charm.
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
  
  export default Sidon;