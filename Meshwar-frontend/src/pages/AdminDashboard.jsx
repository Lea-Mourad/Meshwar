import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    image: "",
    ticket_link: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Event name is required";
    }
    
    if (!formData.date) {
      errors.date = "Event date is required";
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!formData.category) {
      errors.category = "Category is required";
    }
    
    if (!formData.image.trim()) {
      errors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      errors.image = "Please enter a valid URL";
    }
    
    if (formData.ticket_link && !isValidUrl(formData.ticket_link)) {
      errors.ticket_link = "Please enter a valid URL";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setErrorMessage("Please log in to add events");
        navigate('/admin-login');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/events/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setSuccessMessage("Event added successfully!");
      setFormData({
        name: "",
        date: "",
        location: "",
        category: "",
        image: "",
        ticket_link: "",
        description: "",
      });
    } catch (error) {
      if (error.response?.data) {
        setErrorMessage(error.response.data.message || "Failed to add event");
      } else {
        setErrorMessage("An error occurred while adding the event");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#984949] to-[#F5E3C1] opacity-70"></div>

      {/* Admin Form */}
      <div className="relative z-10 p-10 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-[#984949] mb-6 text-center">Add New Event</h2>
        
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.date && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.location ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.location && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
            )}
          </div>

          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
              <option value="Culture">Culture</option>
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {validationErrors.category && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
            )}
          </div>

          <div>
            <input
              type="url"
              name="image"
              placeholder="Event Image URL"
              value={formData.image}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.image && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.image}</p>
            )}
          </div>

          <div>
            <input
              type="url"
              name="ticket_link"
              placeholder="Ticket Link (optional)"
              value={formData.ticket_link}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded ${
                validationErrors.ticket_link ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.ticket_link && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.ticket_link}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Event Description (optional)"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#984949] text-white py-3 rounded-lg transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B24F4F]'
            }`}
          >
            {loading ? 'Adding Event...' : 'Add Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
