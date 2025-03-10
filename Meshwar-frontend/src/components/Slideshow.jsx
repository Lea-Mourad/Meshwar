import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slideshow = () => {
  const images = [
    "https://i.pinimg.com/474x/36/25/76/362576aa830cb69135ab5db1ba3a73d3.jpg",
    "https://i.pinimg.com/474x/ac/d1/4c/acd14c87a3e0b4891202a6e4f3545d37.jpg",
    "z.jpg",
    "/images/lebanon4.jpg",
  ];

  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img
              src={src}
              alt={`Lebanon ${index + 1}`}
              className="w-full max-h-[80vh] object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
