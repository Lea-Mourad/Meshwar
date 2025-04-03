import React, { useState } from "react";
import beirutPlacesData from "../data/beirutPlacesData";

const AddListing = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [listings, setListings] = useState(beirutPlacesData);

  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Baalbek", "Sour"];
  const categories = ["Historical", "Natural", "Cultural", "Adventure", "Food", "Shopping", "Nightlife", "Other"];
  const handleAddListing = async (e) => {
    e.preventDefault();
  
    const newListing = {
      name,
      city,
      category,
      max_people: maxPeople,
      cost,
      description,
      picture_url: imageUrl,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing),
      });
  
      if (response.ok) {
        setListings([...listings, newListing]);
        setSuccessMessage("Listing added successfully!");
        setErrorMessage(""); // Clear any previous error message
        setName(""); setCity(""); setCategory(""); setMaxPeople(""); setCost(""); setDescription(""); setImageUrl("");
      } else {
        try {
          const errorData = await response.json();
          if (errorData) {
            // Format and display validation errors
            let allErrors = "";
            for (const key in errorData) {
              allErrors += `${key}: ${errorData[key].join(", ")}\n`;
            }
            setErrorMessage(`Failed to add listing. Errors:\n${allErrors}`);
          } else {
            setErrorMessage("Failed to add listing.");
          }
          console.error("Failed to add listing:", errorData);
        } catch (error) {
          const errorBody = await response.text();
          console.error("Failed to parse error response:", error);
          console.error("Raw error body:", errorBody);
          setErrorMessage(`Failed to add listing. Server error.`);
        }
      }
    } catch (error) {
      console.error("Error adding listing:", error);
      setErrorMessage("Something went wrong with the request!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#984949] mb-4 text-center">Add New Listing</h2>
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

        <form onSubmit={handleAddListing} className="space-y-4">
          <input
            type="text"
            placeholder="Listing Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select City</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat} value={cat.toUpperCase()}>{cat}</option>)}
          </select>

          <input
            type="number"
            placeholder="Max People"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded"
          />
          
          <button
            type="submit"
            className="w-full bg-[#984949] text-white py-3 rounded-lg hover:bg-[#B24F4F] transition"
          >
            Add Listing
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-center mb-4">Current Listings</h3>
          <ul>
            {listings.map((listing) => (
              <li key={listing.id} className="border-b py-2">
                <h4 className="font-semibold">{listing.name}</h4>
                <p>{listing.category}</p>
                <p>{listing.description}</p>
                <img src={listing.picture_url} alt={listing.name} className="w-full h-48 object-cover" />
                <p>Price: {listing.priceRange}</p>
                <a href={listing.url} target="_blank" rel="noopener noreferrer">More info</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
