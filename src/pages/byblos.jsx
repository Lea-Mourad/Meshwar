import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Byblos = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Historical Sites", "Restaurants", "Beaches", "Coffee Shops", "Hotels", "Night Life"];

  const categoryImages = {
    "Historical Sites": "url('https://live.staticflickr.com/65535/51111865973_758b50d3c0_b.jpg')",
    Restaurants: "url('https://i.pinimg.com/736x/36/85/40/368540556d16c7be2f2771230cf95ee7.jpg')",
    Beaches: "url('https://lh5.googleusercontent.com/proxy/nrtfMqLzhNcunUY2znuFaBs0HC4YZ5olfRE_friYQD0ssR0bbyR_SnmuiDCPW1FeAWGdmt92997VDsAiv6xZO9lmIx55vzQnP11UfAc7dvv9yN5xqbr1wsAq8I5xfikzuFsxHj3u8d8iSJDHdebqLYBbzlwPzcvPGvcVI1pdejam1J5EAA3pwd4mrRWK8j7963LkFpGissbRF58TP4Qb_ZoDUgCwpOR3sg')",
    "Coffee Shops": "url('https://bunny-wp-pullzone-eqa83h6t2a.b-cdn.net/wp-content/uploads/2023/10/74398641-51756703.jpg')",
    Hotels: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/150346751.webp?k=1363992a56d1130b40e1d80960ebfa0260ecb9e5b829467e92b9f0b1448b85b1&o=')",
    "Night Life": "url('https://www.plus961.com/wp-content/uploads/2010/06/E-Cafe-Jbeil.jpg')",
  };


  const images = [
    "https://medcities.org/wp-content/uploads/2021/05/capcalera-jbeil.jpg",
    "https://www.sophiesworld.net/wp-content/uploads/2018/07/IMG_E3094.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4e/6d/44/caption.jpg?w=1200&h=1200&s=1",
    "https://libshop.fr/wp-content/uploads/2020/01/byblosliban.jpg",
  ];
  const handleCategoryClick = (category) => {
    const cityName = "byblos";  // Hardcoded city name for the Beirut page
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
            BYBLOS
          </h1>

      {/* Description */}
      <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md ">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
       

Byblos, one of the oldest continuously inhabited cities in the world, is the cradle of the Phoenician civilization and the 
birthplace of the alphabet. Steeped in history, this coastal gem tells the story of ancient seafarers who shaped trade and 
communication across the Mediterranean. Its charming harbor, medieval citadel, and well-preserved ruins offer a glimpse into
 a glorious past, while its vibrant souks and seaside cafés showcase a lively present. From the grand temples of antiquity to 
 the whispers of the Phoenician script, Byblos stands as a timeless bridge between history and modernity, inviting visitors to
  explore its legendary heritage.

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

export default Byblos;
