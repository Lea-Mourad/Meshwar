import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Baalbak = () => {
    const navigate = useNavigate();
    const categories = ["Historical Sites", "Restaurants", "Coffee Shops", "Hotels"];
  
    const categoryImages = {
      "Historical Sites": "url('https://crm.visit-lebanon.org/alternatedocroots/6a025965-2f91-400b-b617-45bfcaf736db-shutterstock_477215944.jpg')",
      Restaurants: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/03/cc/e5/caption.jpg?w=500&h=-1&s=1')",
      "Coffee Shops": "url(' https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/bf/d9/aurelia.jpg?w=600&h=400&s=1')",
      Hotels: "url('https://palmyrahotel.com.lb/__static/625cfed608f37f890b744a73c35b7c24/photo-2023-05-09-17-43-20.jpg')",
      
    };
  
    const images = [
      "https://crm.visit-lebanon.org/alternatedocroots/7c8210d5-3917-40b3-b2d7-73a197a2f4ca-shutterstock_373233778.jpg",
      "https://www.executive-magazine.com/wp-content/uploads/2014/04/festivalsBaalbeck.jpg",

    ];
  
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
            BAALBAK
          </h1>
  
          {/* Description */}
          <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md ">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
          Baalbek, the city of the sun, stands as one of the most awe-inspiring archaeological wonders of the ancient world.
           Once a major religious center of the Phoenicians and later a grand Roman sanctuary, Baalbek is home to the colossal ruins of the Temple of Jupiter, the largest Roman temple ever built, 
           alongside the magnificently preserved Temple of Bacchus. Its towering stone columns and intricate carvings speak of a glorious past where gods, emperors, and civilizations converged.
            Nestled in the Bekaa Valley, Baalbek remains a symbol of Lebanon’s rich heritage, drawing visitors to marvel at its grandeur and timeless splendor.
            </p>
          </div>
  
          {/* Categories */}
          <div className="w-full max-w-5xl mt-10 p-6 flex flex-wrap justify-center gap-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="w-72 h-48 relative flex items-center justify-center rounded-lg text-2xl font-semibold transition-all shadow-lg bg-cover bg-center text-white hover:scale-105 hover:shadow-2xl"
                            style={{ backgroundImage: categoryImages[category] }}
                            onClick={() => navigate(`/${category.toLowerCase().replace(/\s/g, "-")}`)}
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
  
  export default Baalbak;