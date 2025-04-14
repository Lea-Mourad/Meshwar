import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";

const Byblos = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { value: "HISTORICAL", label: "Historical Sites" },
    { value: "RESTAURANT", label: "Restaurants" },
    { value: "BEACH", label: "Beaches" },
    { value: "COFFEE", label: "Coffee Shops" },
    { value: "HOTEL", label: "Hotels" },
    { value: "NIGHTLIFE", label: "Night Life" },
    { value: "MUSEUM", label: "Museums" },
    { value: "ACTIVITY", label: "Activities" }
  ];

  const categoryImages = {
    HISTORICAL: "url('https://example.com/historical.jpg')",
    RESTAURANT: "url('https://example.com/restaurant.jpg')",
    // ... other category images ...
  };

  const cityImages = [
    "https://example.com/byblos1.jpg",
    "https://example.com/byblos2.jpg",
    // ... other city images ...
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://meshwar-backend.onrender.com/locations/?city=BYBLOS`
        );
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleCategoryClick = (categoryValue) => {
    navigate(`/byblos/${categoryValue.toLowerCase()}`);
  };

  const getLocationsByCategory = (category) => {
    return locations.filter(loc => loc.category === category);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full overflow-auto bg-[#F5E3C1] bg-opacity-60">
      <Header />

      {/* City Image Slideshow */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-screen"
      >
        {cityImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`Byblos ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* City Title */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-[#B24F4F]">
          BYBLOS
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          One of the oldest continuously inhabited cities in the world
        </p>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryLocations = getLocationsByCategory(category.value);
            if (categoryLocations.length === 0) return null;
            
            return (
              <div key={category.value} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Category Header */}
                <div 
                  className="h-48 bg-cover bg-center flex items-center justify-center relative"
                  style={{ backgroundImage: categoryImages[category.value] }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <h2 className="text-2xl font-bold text-white relative z-10">
                    {category.label}
                  </h2>
                </div>

                {/* Locations List */}
                <div className="p-4">
                  {categoryLocations.map(location => (
                    <div 
                      key={location.id} 
                      className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/location/${location.id}`)}
                    >
                      <h3 className="font-bold text-lg">{location.name}</h3>
                      <p className="text-gray-600">{location.address}</p>
                      {location.image_url && (
                        <img 
                          src={location.image_url} 
                          alt={location.name}
                          className="mt-2 w-full h-32 object-cover rounded"
                        />
                      )}
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {location.current_people}/{location.max_people} people
                        </span>
                        <span className="text-sm font-semibold">
                          {Array(location.cost_range).fill('$').join('')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Byblos;