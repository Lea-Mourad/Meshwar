import React, { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa"; // Import heart and close icons

const PlaceCard = ({ place }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the place is marked as favorite
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the favorite button click from triggering the card click
    setIsFavorite(!isFavorite); // Toggle the favorite state
  };

  const handleCardClick = () => {
    setIsModalOpen(true); // Open modal when card is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      {/* Place Card */}
      <div
        className="bg-white shadow-lg rounded-lg p-8 w-96 h-[510px] hover:transform hover:translate-y-2 transition-transform duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          {/* Updated Image with Bigger Size */}
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Name and Heart Icon next to each other */}
        <div className="flex items-center mt-4">
          <h3 className="text-xl font-semibold text-gray-800 flex-grow">{place.name}</h3>
          <button
            onClick={handleFavoriteClick}
            className="text-red-500 hover:text-red-700"
          >
            <FaHeart size={24} color={isFavorite ? "red" : "gray"} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">{place.description}</p>
      </div>

      {/* Modal for more information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
            {/* Close (X) Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={24} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center">
              {/* Image in Modal */}
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{place.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{place.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Price Range:</strong> {place.priceRange || "Not Available"}
              </p>

              {/* Visit Them Button */}
              <div className="mt-6">
                <a
                  href={place.url || "#"} // If no URL, fallback to "#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B24F4F] text-white px-12 py-4 rounded-lg hover:bg-[#9e3d3d] transition duration-300"
                >
                  Visit Them
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceCard;
