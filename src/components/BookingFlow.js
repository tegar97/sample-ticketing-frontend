import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, bookingService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const BookingFlow = () => {
    const { eventId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            const response = await eventService.getEvent(eventId);
            setEvent(response.data.event);
        } catch (err) {
            setError('Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        setBookingLoading(true);
        setError('');

        try {
            const response = await bookingService.createBooking({
                event_id: eventId,
                quantity: quantity
            });
            
            setBooking(response.data.booking);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    const handleConfirmBooking = async () => {
        setBookingLoading(true);
        setError('');

        try {
            await bookingService.confirmBooking(booking.id);
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.error || 'Confirmation failed');
        } finally {
            setBookingLoading(false);
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

    const containerStyle = {
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    };

    const stepIndicatorStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
    };

    const stepStyle = (active) => ({
        padding: '0.5rem 1rem',
        backgroundColor: active ? '#3498db' : '#ecf0f1',
        color: active ? 'white' : '#7f8c8d',
        borderRadius: '4px',
        margin: '0 0.5rem'
    });

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    };

    const inputStyle = {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    };

    const buttonStyle = {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    };

    const errorStyle = {
        color: '#e74c3c',
        fontSize: '0.9rem',
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#ffeaa7',
        borderRadius: '4px'
    };

    const successStyle = {
        color: '#27ae60',
        fontSize: '1rem',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#d5f4e6',
        borderRadius: '4px'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <h2>Loading event details...</h2>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div style={containerStyle}>
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={stepIndicatorStyle}>
                <div style={stepStyle(step >= 1)}>1. Select Tickets</div>
                <div style={stepStyle(step >= 2)}>2. Confirm Booking</div>
                <div style={stepStyle(step >= 3)}>3. Payment & Tickets</div>
            </div>

            {error && <div style={errorStyle}>{error}</div>}

            {step === 1 && (
                <div>
                    <h2>Book Tickets for {event.title}</h2>
                    
                    <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <h3>{event.title}</h3>
                        <p>📍 {event.venue}</p>
                        <p>📅 {formatDate(event.event_date)}</p>
                        <p>💰 {formatPrice(event.price)} per ticket</p>
                        <p>🎫 {event.available_tickets} tickets available</p>
                    </div>

                    <div style={formStyle}>
                        <label>
                            Number of tickets:
                            <input
                                type="number"
                                min="1"
                                max={event.available_tickets}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                style={inputStyle}
                            />
                        </label>

                        <div style={{ padding: '1rem', backgroundColor: '#e8f6f3', borderRadius: '4px' }}>
                            <h4>Order Summary</h4>
                            <p>Tickets: {quantity} × {formatPrice(event.price)}</p>
                            <p><strong>Total: {formatPrice(event.price * quantity)}</strong></p>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={bookingLoading || quantity > event.available_tickets}
                            style={{
                                ...buttonStyle,
                                backgroundColor: bookingLoading ? '#bdc3c7' : '#2ecc71'
                            }}
                        >
                            {bookingLoading ? 'Processing...' : 'Proceed to Booking'}
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && booking && (
                <div>
                    <h2>Confirm Your Booking</h2>
                    
                    <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <h3>Booking Details</h3>
                        <p><strong>Event:</strong> {event.title}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Date:</strong> {formatDate(event.event_date)}</p>
                        <p><strong>Tickets:</strong> {booking.quantity}</p>
                        <p><strong>Total Amount:</strong> {formatPrice(booking.total_amount)}</p>
                        <p><strong>Booking ID:</strong> {booking.id}</p>
                    </div>

                    <div style={formStyle}>
                        <p>Please review your booking details and confirm to proceed with payment.</p>
                        
                        <button
                            onClick={handleConfirmBooking}
                            disabled={bookingLoading}
                            style={{
                                ...buttonStyle,
                                backgroundColor: bookingLoading ? '#bdc3c7' : '#2ecc71'
                            }}
                        >
                            {bookingLoading ? 'Processing Payment...' : 'Confirm & Pay'}
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={successStyle}>
                    <h2>🎉 Booking Successful!</h2>
                    <p>Your tickets have been booked successfully.</p>
                    <p>You will receive your digital tickets shortly.</p>
                    
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/my-bookings')}
                            style={buttonStyle}
                        >
                            View My Bookings
                        </button>
                        
                        <button
                            onClick={() => navigate('/my-tickets')}
                            style={{...buttonStyle, backgroundColor: '#3498db'}}
                        >
                            View My Tickets
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingFlow; 