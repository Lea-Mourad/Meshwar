import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/header";
import { useAuth } from "../context/authContext";
import { addToFavorites, removeFromFavorites } from "../services/favoritesService";

const Batroun = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

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
    HISTORICAL: "url('https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/88/9b/60.jpg')",
    RESTAURANT: "url('https://www.tasteandflavors.com/wp-content/uploads/2024/06/IAB-1-scaled.jpeg')",
    BEACH: "url('https://ucarecdn.com/41a32e20-5957-4027-a666-3c7b4dd9e1df/-/crop/1000x525/0,138/-/resize/1200x630/-/resize/x400/')",
    COFFEE: "url('https://www.tasteandflavors.com/wp-content/uploads/2023/07/DSC_6773_00129-1024x1024.jpg')",
    HOTEL: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/568355222.webp?k=4d3c60931b03d0a97355e5669b243a0fe7f005e89916ab4956ffff3d0b8cdf25&o=')",
    NIGHTLIFE: "url('https://www.lebanoninapicture.com/pages/batroun-%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D9%88%D9%86_%D8%B3%D9%81%D8%B1%D8%A9-oddrooftop-rooftop-nightlife-music/batroun-%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D9%88%D9%86_%D8%B3%D9%81%D8%B1%D8%A9-oddrooftop-rooftop-nightli-7-6-2018-9-23-59-pm-m.jpg')",

  };

  const cityImages = [
    "https://us.images.westend61.de/0001873362pw/aerial-view-of-batroun-batroun-lebanon-AAEF20916.jpg",
    "https://www.felventura.com/wp-content/uploads/2024/04/Batroun-Phoenecian-wall-Felventura.webp",
    "https://owlovertheworld.com/wp-content/uploads/2024/02/batroun-lebanon-attractions.jpg",
    "https://www.travel-tramp.com/wp-content/uploads/2023/08/Things-to-do-in-Batroun-2.jpg.webp",

  ];


  // Fetch favorites immediately if authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;
      setFavoritesLoading(true);
      try {
        const response = await fetch("https://meshwar-backend.onrender.com/favorites/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setFavoritesLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // Fetch locations separately
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://meshwar-backend.onrender.com/locations/?city=BATROUN`
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
    navigate(`/batroun/${categoryValue.toLowerCase()}`);
  };

  const handleFavoriteClick = async (e, locationId) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.location.id === locationId);
      if (isCurrentlyFavorite) {
        await removeFromFavorites(locationId);
        setFavorites(favorites.filter(fav => fav.location.id !== locationId));
      } else {
        await addToFavorites(locationId);
        // Immediately update the local state with the new favorite
        const location = locations.find(loc => loc.id === locationId);
        if (location) {
          setFavorites([...favorites, { location }]);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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
              alt={`Batroun ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* City Title */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-[#B24F4F]">
          BATROUN
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
           Batroun, a picturesque coastal town, is a hidden gem of Lebanon, where history, nature, and vibrant culture blend seamlessly. One of the oldest continuously inhabited cities in the world, Batroun boasts ancient Phoenician walls
           that have withstood the test of time, charming stone-paved streets, and historic churches that whisper tales of the past. Known for its crystal-clear Mediterranean waters and lively beach scene, the town is also
            famous for its fresh seafood and locally produced lemonade.
            Whether exploring its historic souks, enjoying its bustling nightlife, or simply relaxing by the sea, Batroun offers a perfect mix of heritage, serenity, and adventure.
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
                  {categoryLocations.map(location => {
                    const isFavorite = favorites.some(fav => fav.location.id === location.id);
                    return (
                      <div 
                        key={location.id} 
                        className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer relative"
                        onClick={() => navigate(`/location/${location.id}`)}
                      >
                        <button
                          onClick={(e) => handleFavoriteClick(e, location.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 z-10"
                          disabled={favoritesLoading}
                        >
                          {favoritesLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                          ) : (
                            <FaHeart size={20} color={isFavorite ? "red" : "gray"} />
                          )}
                        </button>
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Batroun;
