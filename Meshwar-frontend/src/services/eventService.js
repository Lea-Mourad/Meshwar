import axios from 'axios';

const API_URL = 'https://meshwar-backend.onrender.com';

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// Get event by ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/events/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};

// Create new event
export const createEvent = async (eventData, token) => {
    try {
        const response = await axios.post(`${API_URL}/events/`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Update event
export const updateEvent = async (id, eventData, token) => {
    try {
        const response = await axios.put(`${API_URL}/events/${id}/`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

// Delete event
export const deleteEvent = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/events/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}; 