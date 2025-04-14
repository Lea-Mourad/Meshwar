import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddListing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        location: '',
        city: 'BEIRUT',
        category: 'HISTORICAL',
        max_people: null,
        cost_range: null,
        description: '',
        image_url: '',
        ticket_link: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? null : Number(value)
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setError(null);
        
    // //     try {
    // //         const token = localStorage.getItem('token');
    // //         if (!token) {
    // //             throw new Error('Authentication token not found');
    // //         }

    // //         const response = await axios.post(
    // //             'https://meshwar-backend.onrender.com/locations/', 
    // //             formData, 
    // //             {
    // //                 headers: {
    // //                     'Authorization': `Bearer ${token}`,
    // //                     'Content-Type': 'application/json'
    // //                 }
    // //             }
    // //         );
            
    // //         console.log('Listing added successfully:', response.data);
    // //         navigate('/');
    // //     } catch (error) {
    // //         console.error('Submission error:', {
    // //             message: error.message,
    // //             response: error.response?.data,
    // //             config: error.config
    // //         });
            
    // //         setError(
    // //             error.response?.data?.detail || 
    // //             error.response?.data?.message || 
    // //             error.message || 
    // //             'Failed to add listing. Please try again.'
    // //         );
    // //     } finally {
    // //         setIsSubmitting(false);
    // //     }
    // // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Remove the Authorization header
          await axios.post('https://meshwar-backend.onrender.com/locations/', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        // navigate('/');
        console.log("Successfully added listing");
        } catch (error) {
          console.error('Error adding listing:', error.response?.data || error.message);
        }
      };

    const cities = [
        'BEIRUT', 'BAALBAK', 'BATROUN', 'BYBLOS', 'SIDON', 'SOUR'
    ];

    const categories = [
        'HISTORICAL', 'RESTAURANT', 'BEACH', 'COFFEE',
        'HOTEL', 'NIGHTLIFE', 'MUSEUM', 'ACTIVITY'
    ];

    const displayCategoryName = (category) => {
        const names = {
            'HISTORICAL': 'Historical Site',
            'RESTAURANT': 'Restaurant',
            'BEACH': 'Beach',
            'COFFEE': 'Coffee Shop',
            'HOTEL': 'Hotel',
            'NIGHTLIFE': 'Night Life',
            'MUSEUM': 'Museum',
            'ACTIVITY': 'Activity'
        };
        return names[category] || category;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-2xl font-bold mb-6">Add New Listing</h2>
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name*</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address*</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location (Google Maps link)</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="https://maps.google.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City*</label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            {cities.map(city => (
                                                <option key={city} value={city}>
                                                    {city.charAt(0) + city.slice(1).toLowerCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category*</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {displayCategoryName(category)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Maximum People</label>
                                        <input
                                            type="number"
                                            name="max_people"
                                            value={formData.max_people ?? ''}
                                            onChange={handleNumberChange}
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Optional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cost Range*</label>
                                        <input
                                            type="number"
                                            name="cost_range"
                                            value={formData.cost_range ?? ''}
                                            onChange={handleNumberChange}
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                            placeholder="0 for free"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder='Optional'
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                        <input
                                            type="url"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ticket Link</label>
                                        <input
                                            type="url"
                                            name="ticket_link"
                                            value={formData.ticket_link}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="https://tickets.example.com"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                        >
                                            {isSubmitting ? 'Adding...' : 'Add Listing'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListing;