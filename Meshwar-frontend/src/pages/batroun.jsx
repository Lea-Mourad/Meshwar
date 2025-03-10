import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Batroun = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Historical Sites", "Restaurants", "Beaches", "Coffee Shops", "Hotels", "Night Life"];

  const categoryImages = {
    "Historical Sites": "url('https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/88/9b/60.jpg')",
    Restaurants: "url('https://www.tasteandflavors.com/wp-content/uploads/2024/06/IAB-1-scaled.jpeg')",
    Beaches: "url('https://ucarecdn.com/41a32e20-5957-4027-a666-3c7b4dd9e1df/-/crop/1000x525/0,138/-/resize/1200x630/-/resize/x400/')",
    "Coffee Shops": "url('https://www.tasteandflavors.com/wp-content/uploads/2023/07/DSC_6773_00129-1024x1024.jpg')",
    Hotels: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/568355222.webp?k=4d3c60931b03d0a97355e5669b243a0fe7f005e89916ab4956ffff3d0b8cdf25&o=')",

    "Night Life": "url('https://www.lebanoninapicture.com/pages/batroun-%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D9%88%D9%86_%D8%B3%D9%81%D8%B1%D8%A9-oddrooftop-rooftop-nightlife-music/batroun-%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D9%88%D9%86_%D8%B3%D9%81%D8%B1%D8%A9-oddrooftop-rooftop-nightli-7-6-2018-9-23-59-pm-m.jpg')",
  };

  const images = [
    "https://us.images.westend61.de/0001873362pw/aerial-view-of-batroun-batroun-lebanon-AAEF20916.jpg",
    "https://www.felventura.com/wp-content/uploads/2024/04/Batroun-Phoenecian-wall-Felventura.webp",
    "https://owlovertheworld.com/wp-content/uploads/2024/02/batroun-lebanon-attractions.jpg",
    "https://www.travel-tramp.com/wp-content/uploads/2023/08/Things-to-do-in-Batroun-2.jpg.webp",

  ];

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
            BATROUN
          </h1>

      {/* Description */}
      <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md ">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
          Batroun, a picturesque coastal town, is a hidden gem of Lebanon, where history, nature, and vibrant culture blend seamlessly. One of the oldest continuously inhabited cities in the world, Batroun boasts ancient Phoenician walls
           that have withstood the test of time, charming stone-paved streets, and historic churches that whisper tales of the past. Known for its crystal-clear Mediterranean waters and lively beach scene, the town is also
            famous for its fresh seafood and locally produced lemonade.
            Whether exploring its historic souks, enjoying its bustling nightlife, or simply relaxing by the sea, Batroun offers a perfect mix of heritage, serenity, and adventure.


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

export default Batroun;
