import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const response = await eventService.getEvent(id);
            setEvent(response.data.event);
        } catch (err) {
            setError('Failed to load event details');
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

    const containerStyle = {
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '2rem'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    };

    const imageStyle = {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };

    const contentStyle = {
        padding: '2.5rem'
    };

    const titleStyle = {
        fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em',
        lineHeight: '1.2'
    };

    const descriptionStyle = {
        fontSize: '1.125rem',
        color: '#64748b',
        lineHeight: '1.7',
        marginBottom: '2rem'
    };

    const detailsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2.5rem'
    };

    const detailItemStyle = {
        padding: '1.5rem',
        background: 'rgba(248, 250, 252, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(226, 232, 240, 0.6)'
    };

    const detailLabelStyle = {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const detailValueStyle = {
        fontSize: '1rem',
        color: '#64748b'
    };

    const priceValueStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#0f172a'
    };

    const availabilityStyle = (available) => ({
        fontSize: '1rem',
        fontWeight: '600',
        color: available > 0 ? '#059669' : '#dc2626'
    });

    const buttonStyle = {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '600'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        background: 'transparent',
        color: '#0f172a',
        border: '1px solid #e2e8f0'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <h2>Loading event details...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={containerStyle}>
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {event.image_url ? (
                    <img 
                        src={event.image_url} 
                        alt={event.title}
                        style={imageStyle}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div 
                    style={{
                        ...imageStyle,
                        display: event.image_url ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem'
                    }}
                >
                    🎭
                </div>
                
                <div style={contentStyle}>
                    <h1 style={titleStyle}>{event.title}</h1>
                    
                    <p style={descriptionStyle}>
                        {event.description}
                    </p>
                    
                    <div style={detailsGridStyle}>
                        <div style={detailItemStyle}>
                            <div style={detailLabelStyle}>
                                <span>📍</span>
                                <span>Venue</span>
                            </div>
                            <p style={detailValueStyle}>{event.venue}</p>
                        </div>
                        
                        <div style={detailItemStyle}>
                            <div style={detailLabelStyle}>
                                <span>📅</span>
                                <span>Date & Time</span>
                            </div>
                            <p style={detailValueStyle}>{formatDate(event.event_date)}</p>
                        </div>
                        
                        <div style={detailItemStyle}>
                            <div style={detailLabelStyle}>
                                <span>💰</span>
                                <span>Price</span>
                            </div>
                            <p style={priceValueStyle}>
                                {formatPrice(event.price)}
                            </p>
                        </div>
                        
                        <div style={detailItemStyle}>
                            <div style={detailLabelStyle}>
                                <span>🎫</span>
                                <span>Availability</span>
                            </div>
                            <p style={availabilityStyle(event.available_tickets)}>
                                {event.available_tickets}/{event.total_tickets} tickets available
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link 
                            to="/events" 
                            style={secondaryButtonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            ← Back to Events
                        </Link>
                        
                        {event.available_tickets > 0 ? (
                            isAuthenticated ? (
                                <Link 
                                    to={`/booking/${event.id}`} 
                                    style={buttonStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(15, 23, 42, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Book Now
                                </Link>
                            ) : (
                                <Link 
                                    to="/login" 
                                    style={buttonStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(15, 23, 42, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Login to Book
                                </Link>
                            )
                        ) : (
                            <span style={{ 
                                ...buttonStyle, 
                                background: '#e2e8f0', 
                                color: '#94a3b8',
                                cursor: 'not-allowed' 
                            }}>
                                Sold Out
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

 