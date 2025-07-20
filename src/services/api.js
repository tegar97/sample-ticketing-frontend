import axios from 'axios';

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:8001';
const EVENT_SERVICE_URL = process.env.REACT_APP_EVENT_SERVICE_URL || 'http://localhost:8002';
const BOOKING_SERVICE_URL = process.env.REACT_APP_BOOKING_SERVICE_URL || 'http://localhost:8003';
const TICKETING_SERVICE_URL = process.env.REACT_APP_TICKETING_SERVICE_URL || 'http://localhost:8004';

const getAuthToken = () => localStorage.getItem('token');

const authAPI = axios.create({
    baseURL: `${AUTH_SERVICE_URL}/api/v1`,
});

const eventAPI = axios.create({
    baseURL: `${EVENT_SERVICE_URL}/api/v1`,
});

const bookingAPI = axios.create({
    baseURL: `${BOOKING_SERVICE_URL}/api/v1`,
});

const ticketingAPI = axios.create({
    baseURL: `${TICKETING_SERVICE_URL}/api/v1`,
});

bookingAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

ticketingAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: (userData) => authAPI.post('/register', userData),
    login: (credentials) => authAPI.post('/login', credentials),
    getProfile: () => authAPI.get('/profile', {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
    validateToken: (token) => authAPI.get(`/validate?token=${token}`)
};

export const eventService = {
    getEvents: () => eventAPI.get('/events'),
    getEvent: (id) => eventAPI.get(`/events/${id}`),
    createEvent: (eventData) => eventAPI.post('/events', eventData),
    updateEvent: (id, eventData) => eventAPI.put(`/events/${id}`, eventData),
    deleteEvent: (id) => eventAPI.delete(`/events/${id}`)
};

export const bookingService = {
    createBooking: (bookingData) => bookingAPI.post('/bookings', bookingData),
    getUserBookings: () => bookingAPI.get('/bookings'),
    getBooking: (id) => bookingAPI.get(`/bookings/${id}`),
    confirmBooking: (id) => bookingAPI.put(`/bookings/${id}/confirm`),
    cancelBooking: (id) => bookingAPI.delete(`/bookings/${id}`)
};

export const ticketingService = {
    generateTickets: (ticketData) => ticketingAPI.post('/tickets/generate', ticketData),
    getUserTickets: (userId) => ticketingAPI.get(`/tickets/user/${userId}`),
    validateTicket: (ticketCode) => ticketingAPI.get(`/tickets/${ticketCode}/validate`),
    useTicket: (ticketCode) => ticketingAPI.put(`/tickets/${ticketCode}/use`)
}; 