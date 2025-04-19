import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
    const { id } = useParams();  
    const [listing, setListing] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://meshwar-backend.onrender.com/locations/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setListing(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching listing:", error);
                setError("Failed to fetch listing details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#984949]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600 text-xl p-4 bg-red-100 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-gray-600 text-xl">
                    Listing not found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src={listing.picture_url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} 
                        alt={listing.name}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-[#984949] mb-4">{listing.name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Location Details</h2>
                                <p className="text-gray-600"><span className="font-semibold">City:</span> {listing.city}</p>
                                <p className="text-gray-600"><span className="font-semibold">Address:</span> {listing.address}</p>
                                <p className="text-gray-600"><span className="font-semibold">Category:</span> {listing.category}</p>
                                <p className="text-gray-600"><span className="font-semibold">Price Range:</span> {listing.price_range}</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
                                <p className="text-gray-600"><span className="font-semibold">Max People:</span> {listing.max_people || "Not specified"}</p>
                                <p className="text-gray-600"><span className="font-semibold">Cost:</span> {listing.cost || "Not specified"}</p>
                                <p className="text-gray-600"><span className="font-semibold">Rating:</span> {listing.rating || "Not rated"}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-600">{listing.description || "No description available"}</p>
                        </div>
                        {listing.url && (
                            <a 
                                href={listing.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#984949] text-white px-6 py-3 rounded-lg hover:bg-[#B24F4F] transition"
                            >
                                Visit Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
