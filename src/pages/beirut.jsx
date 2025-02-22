import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Beirut = () => {
  const images = [
    "https://lp-cms-production.imgix.net/2020-12/shutterstockRF_756972694.jpg",
    "https://img.travelnaut.com/web/db/photose/location/as/lb/beirut/a8f769f130642d7a50f738c3dc965492.jpeg?format=webp&width=3840&quality=75",
    "https://www.hospitalitynewsmag.com/wp-content/uploads/2020/01/Zaytouna-Bay-at-Sunset-Beirut-Downtown.jpg",
    "https://images.ajar.casa/wp-content/uploads/2022/05/16015058/Ruins-in-Beirut-Downtown-near-Martyrs-Square.jpg",
   
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <Header />

      {/* Slideshow Section */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-[70vh]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img
              src={src}
              alt={`Lebanon ${index + 1}`}
              className="w-full max-h-[70vh] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Title "BEIRUT" */}
      <h1 className="text-6xl  font-extrabold text-[#B24F4F] mt-6 tracking-wide"
      style={{ fontFamily: "'Pathway', sans-serif" }}>
        BEIRUT
      </h1>

      {/* Full-Width Description Box */}
      <div className="w-full bg-gray-100 px-8 py-10 mt-6 text-center shadow-md">
        <p className="text-gray-800 text-lg sm:text-xl md:text-2xl  leading-relaxed max-w-4xl mx-auto"
        style={{ fontFamily: "'Abel', sans-serif" }}>
          Beirut, the vibrant capital of Lebanon, is a city rich in history, culture, and breathtaking views. 
          From its bustling souks to the serene Mediterranean coastline, Beirut offers a unique blend of tradition and modernity. 
          The city stands as a testament to resilience, having withstood centuries of change and transformation. 
          Whether exploring the lively streets of Gemmayze, admiring the Roman ruins of downtown, or enjoying the coastal beauty 
          of Raouché, Beirut captivates visitors with its charm and diversity. It is a city where past and future intertwine, 
          creating a unique and unforgettable experience for all who walk its streets.
        </p>
      </div>
    </div>
  );
};

export default Beirut;
