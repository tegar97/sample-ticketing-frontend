import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import BookingFlow from './components/BookingFlow';
import MyBookings from './components/MyBookings';
import MyTickets from './components/MyTickets';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route 
                        path="/booking/:eventId" 
                        element={
                            <ProtectedRoute>
                                <BookingFlow />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/my-bookings" 
                        element={
                            <ProtectedRoute>
                                <MyBookings />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/my-tickets" 
                        element={
                            <ProtectedRoute>
                                <MyTickets />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App; 