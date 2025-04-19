import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    category: "",
    max_people: "",
    location: "",
    cost_range: 0,
    description: "",
    image_url: "",
    ticket_link: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cities = ["BEIRUT", "BATROUN", "BYBLOS", "SIDON", "BAALBAK", "SOUR"];
  const categories = [
    { value: "HISTORICAL", label: "Historical sites" },
    { value: "RESTAURANT", label: "Restaurants" },
    { value: "BEACH", label: "Beaches" },
    { value: "COFFEE", label: "Coffee shops" },
    { value: "HOTEL", label: "Hotels" },
    { value: "NIGHTLIFE", label: "Night life" },
    { value: "MUSEUM", label: "Museums" },
    { value: "ACTIVITY", label: "Activities" }
  ];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cost_range' ? parseInt(value) || 0 : value
    }));
  };

  const createListing = async (listingData, token) => {
    try {
      const response = await fetch('https://meshwar-backend.onrender.com/locations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(listingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Required field validation
    if (!formData.name || !formData.city || !formData.category || 
        !formData.cost_range || !formData.address || !formData.location) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Validate category is one of the allowed values
    const validCategories = categories.map(cat => cat.value);
    if (!validCategories.includes(formData.category)) {
      setErrorMessage("Please select a valid category.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setErrorMessage("Authentication required. Please log in.");
        navigate("/admin-login");
        return;
      }

      // Ensure cost_range is an integer
      const listingData = {
        ...formData,
        cost_range: parseInt(formData.cost_range) || 0,
        image_url: formData.image_url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      };

      await createListing(listingData, token);
      
      setSuccessMessage("Listing created successfully!");
      setErrorMessage("");
      setFormData({
        name: "",
        address: "",
        city: "",
        category: "",
        max_people: "",
        location: "",
        cost_range: 0,
        description: "",
        image_url: "",
        ticket_link: ""
      });

      setTimeout(() => navigate("/locations"), 2000);
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage(error.message.includes("token") 
        ? "Session expired. Please log in again."
        : `Error: ${error.message}`
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#984949] mb-4">Add New Listing</h2>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Listing Name *"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address *"
            className="w-full p-3 border rounded"
            required
          />

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select City *</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Category *</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <input
            type="number"
            name="max_people"
            value={formData.max_people}
            onChange={handleChange}
            placeholder="Max People"
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location (Google Maps link or coordinates) *"
            className="w-full p-3 border rounded"
            required
          />

          <select
            name="cost_range"
            value={formData.cost_range}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Cost Range *</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>

          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL *"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="url"
            name="ticket_link"
            value={formData.ticket_link}
            onChange={handleChange}
            placeholder="Ticket Link (optional)"
            className="w-full p-3 border rounded"
          />
          
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full p-3 border rounded"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#984949] text-white py-3 rounded-lg hover:bg-[#B24F4F] transition"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
