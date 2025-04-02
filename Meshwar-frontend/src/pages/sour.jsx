import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";
import LocationsList from "../components/LocationsList";

const Tyre = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["HISTORICAL", "RESTAURANTS", "BEACHES", "COFFEE_SHOPS", "HOTELS", "ACTIVITIES"];

  const categoryImages = {
    HISTORICAL: "url('https://crm.visit-lebanon.org/alternatedocroots/6a025965-2f91-400b-b617-45bfcaf736db-shutterstock_477215944.jpg')",
    RESTAURANTS: "url('https://crm.visit-lebanon.org/alternatedocroots/876be108-0397-405c-8057-1ec24defbf37-shutterstock_660486538-1920.jpg')",
    BEACHES: "url('https://mylebanonguide.com/guide/uploads/2022/09/livelove.tyre-___2010170893770371010_1367834530___--rotated.jpg')",
    COFFEE_SHOPS: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/bf/d9/aurelia.jpg?w=600&h=400&s=1')",
    HOTELS: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/188937132.webp?k=0cae207e60dafbf579f0f1cf775bca9a4be0afa2ce4e02760cd7c716b7e61f1e&o=')",
    ACTIVITIES: "url('https://www.ctm-lecce.it/prove2/wp-content/uploads/2022/05/Blue-Tyre_Aprile_22_News-1.jpeg')",
  };

  const images = [
    "https://preview.redd.it/the-actual-tyre-sour-v0-4r0rfgkhu0md1.jpg?width=1080&crop=smart&auto=webp&s=b5bbad1c7ea2404b048d3fc3017de003eeb06b2c",
    "https://hittheroadket.com/wp-content/uploads/2023/07/TYRE9431.jpg",
    "https://crm.visit-lebanon.org/alternatedocroots/c42b8207-5027-4a8b-a063-1ffc7751e74a-shutterstock_660525961.jpg",
    "https://cdn.britannica.com/02/178002-050-BFCB544B/ruins-Tyre-Lebanon.jpg",
    "https://www.hotelibanais.com/wp-content/uploads/2018/07/hl-site-tyre-1.jpg",
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
            <img src={src} alt={`Tyre ${index + 1}`} className="w-full h-screen object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrollable Content */}
      <div className="flex flex-col items-center justify-start">
        {/* Title */}
        <h1 className="text-6xl font-extrabold text-[#B24F4F] mt-6 tracking-wide" style={{ fontFamily: "'Pathway', sans-serif" }}>
          TYRE
        </h1>

        {/* Description */}
        <div className="w-full bg-[#F5E3C1] bg-opacity-30 px-8 py-10 mt-6 text-center shadow-md">
          <p className="text-gray-800 font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Abel', sans-serif" }}>
            Tyre, an ancient Phoenician city and UNESCO World Heritage site, is a fascinating blend of history and natural beauty.
            The city's archaeological sites, including the Roman Hippodrome and the Al-Bass Necropolis, tell stories of its rich past.
            The picturesque harbor, traditional souks, and pristine beaches make Tyre a perfect destination for both history buffs
            and beach lovers. The city's unique charm lies in its ability to preserve its historical treasures while embracing
            modern Lebanese culture.
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
            <LocationsList city="Tyre" category={selectedCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tyre;