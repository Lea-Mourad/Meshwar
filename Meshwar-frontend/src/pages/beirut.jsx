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

const Beirut = () => {
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
    MUSEUM: "url('https://www.wilmotte.com/wp-content/uploads/2023/03/hr_museebeyrouth_marwanharmouche_04-scaled.jpg')",
    RESTAURANT: "url('https://i.pinimg.com/736x/a2/de/5d/a2de5d984e8cd466a119858cf407b622.jpg')",
    BEACH: "url('https://libshop.fr/wp-content/uploads/2020/04/beyrouth-beach-lebanon-scaled-1.jpg')",
    COFFEE: "url('https://georgerishan.wordpress.com/wp-content/uploads/2021/04/img_4408.jpg?w=936')",
    HOTEL: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/48/bb/91/kempinski-summerland.jpg?w=1200&h=-1&s=1')",
    ACTIVITY: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYcNyC7YD23auPAqFpEjtEKOrDmlFqg5ASLg&s')",
    NIGHTLIFE: "url('https://248am.com/images/2015/04/grandfactory.jpg')",
  };

  const cityImages = [
    "https://lp-cms-production.imgix.net/2020-12/shutterstockRF_756972694.jpg",
    "https://img.travelnaut.com/web/db/photose/location/as/lb/beirut/a8f769f130642d7a50f738c3dc965492.jpeg?format=webp&width=3840&quality=75",
    "https://www.hospitalitynewsmag.com/wp-content/uploads/2020/01/Zaytouna-Bay-at-Sunset-Beirut-Downtown.jpg",
    "https://images.ajar.casa/wp-content/uploads/2022/05/16015058/Ruins-in-Beirut-Downtown-near-Martyrs-Square.jpg",
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
          `https://meshwar-backend.onrender.com/locations/?city=BEIRUT`
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
    navigate(`/beirut/${categoryValue.toLowerCase()}`);
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
        // Fetch the updated favorites list to get complete location data
        const response = await fetch("https://meshwar-backend.onrender.com/favorites/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
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
              alt={`Beirut ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* City Title */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-[#B24F4F]">
          BEIRUT
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
           Beirut, the vibrant capital of Lebanon, is a city rich in history, culture, and breathtaking views. From its bustling
              souks to the serene Mediterranean coastline, Beirut offers a unique blend of tradition and modernity. The city stands
              as a testament to resilience, having withstood centuries of change and transformation. Whether exploring the lively
              streets of Gemmayze, admiring the Roman ruins of downtown, or enjoying the coastal beauty of Raouché, Beirut captivates
              visitors with its charm and diversity. It is a city where past and future intertwine, creating a unique and
              unforgettable experience for all who walk its streets.
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

export default Beirut;
