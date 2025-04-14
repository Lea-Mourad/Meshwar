import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationsList = ({ city, category }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8000/locations/`, {
          params: {
            city: city,
            category: category
          }
        });
        setLocations(response.data);
      } catch (err) {
        setError('Failed to fetch locations. Please try again later.');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (city && category) {
      fetchLocations();
    }
  }, [city, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#984949]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl p-4 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  if (!locations.length) {
    return (
      <div className="text-center text-gray-600 text-xl p-4">
        No locations found for {category} in {city}.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {locations.map((location) => (
        <div key={location.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48">
            <img
              src={location.picture_url || location.picture}
              alt={location.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold text-[#984949] mb-2">{location.name}</h3>
            <p className="text-gray-600 mb-4">{location.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#984949] font-semibold">${location.cost}</span>
              <span className="text-gray-500">Max {location.max_people} people</span>
            </div>
            {location.url && (
              <a
                href={location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-[#984949] text-white px-4 py-2 rounded-lg hover:bg-[#7c3b3b] transition duration-300"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationsList; 