import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingService.getUserBookings();
            setBookings(response.data.bookings);
        } catch (err) {
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return '#2ecc71';
            case 'pending': return '#f39c12';
            case 'cancelled': return '#e74c3c';
            default: return '#7f8c8d';
        }
    };

    const containerStyle = {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem'
    };

    const bookingCardStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <h1>Loading your bookings...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div style={containerStyle}>
                <h1>Error: {error}</h1>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h1>My Bookings</h1>
            
            {bookings.length === 0 ? (
                <p>You haven't made any bookings yet.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id} style={bookingCardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>{booking.event_title}</h3>
                                <p>📍 {booking.venue}</p>
                                <p>📅 {formatDate(booking.event_date)}</p>
                                <p>🎫 {booking.quantity} tickets</p>
                                <p>💰 {formatPrice(booking.total_amount)}</p>
                                <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                                    Booking ID: {booking.id}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                                    Booked on: {formatDate(booking.created_at)}
                                </p>
                            </div>
                            
                            <div style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                backgroundColor: getStatusColor(booking.status),
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                            }}>
                                {booking.status}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyBookings; 