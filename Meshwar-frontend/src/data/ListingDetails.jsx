import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
    const { id } = useParams();  
    const [listing, setListing] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/locations/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setListing(data))
            .catch((error) => {
                console.error("Error fetching listing:", error);
                setError("Failed to fetch listing details.");
            });
    }, [id]);

}
export default ListingDetails;
