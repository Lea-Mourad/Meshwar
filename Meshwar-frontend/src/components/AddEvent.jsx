import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    image: "",
    ticket_link: "",
    description: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createEvent = async (eventData, token) => {
    try {
      const response = await fetch('https://meshwar-backend.onrender.com/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(eventData)
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
    if (!formData.name || !formData.date || !formData.location || 
        !formData.category || !formData.image) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setErrorMessage("Authentication required. Please log in.");
        navigate("/admin-login");
        return;
      }

      // Format date to YYYY-MM-DD
      const formattedData = {
        ...formData,
        date: new Date(formData.date).toISOString().split('T')[0]
      };

      await createEvent(formattedData, token);
      
      setSuccessMessage("Event created successfully!");
      setErrorMessage("");
      setFormData({
        name: "",
        date: "",
        location: "",
        category: "",
        image: "",
        ticket_link: "",
        description: ""
      });

      setTimeout(() => navigate("/events"), 2000);
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
        <h2 className="text-2xl font-bold text-[#984949] mb-4">Add New Event</h2>
        
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
          {/* Required Fields */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name *"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location *"
            className="w-full p-3 border rounded"
            required
          />
          
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Category *</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
          </select>
          
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL *"
            className="w-full p-3 border rounded"
            required
          />

          {/* Optional Fields */}
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
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;