import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventService.getEvents();
            setEvents(response.data.events);
        } catch (err) {
            setError('Failed to load events');
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
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '3rem'
    };

    const titleStyle = {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '1rem',
        letterSpacing: '-0.025em'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: '#64748b',
        maxWidth: '600px',
        margin: '0 auto'
    };

    const eventsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
    };

    const eventCardStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const imageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };

    const cardContentStyle = {
        padding: '1.5rem'
    };

    const eventTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        color: '#0f172a',
        lineHeight: '1.3'
    };

    const detailStyle = {
        marginBottom: '0.5rem',
        color: '#64748b',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const priceStyle = {
        fontSize: '1.375rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '1rem'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '12px',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '600',
        fontSize: '0.875rem'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        background: 'transparent',
        color: '#0f172a',
        border: '1px solid #e2e8f0'
    };

    const availableStyle = (available) => ({
        color: available > 0 ? '#059669' : '#dc2626',
        fontWeight: '600',
        fontSize: '0.875rem'
    });

    if (loading) {
        return (
            <div style={containerStyle}>
                <h1>Loading events...</h1>
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
            <div style={headerStyle}>
                <h1 style={titleStyle}>Discover Amazing Events</h1>
                <p style={subtitleStyle}>Find the perfect event for you from our curated collection of concerts, workshops, and festivals</p>
            </div>
            
            {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p style={{ fontSize: '1.125rem' }}>No events available at the moment.</p>
                </div>
            ) : (
                <div style={eventsGridStyle}>
                    {events.map((event) => (
                        <div 
                            key={event.id} 
                            style={eventCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
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
                                    fontSize: '3rem'
                                }}
                            >
                                🎭
                            </div>
                            
                            <div style={cardContentStyle}>
                                <h3 style={eventTitleStyle}>{event.title}</h3>
                                <p style={{ ...detailStyle, marginBottom: '1rem', lineHeight: '1.5', fontSize: '0.875rem' }}>
                                    {event.description.length > 120 ? event.description.substring(0, 120) + '...' : event.description}
                                </p>
                                <div style={detailStyle}>
                                    <span>📍</span>
                                    <span>{event.venue}</span>
                                </div>
                                <div style={detailStyle}>
                                    <span>📅</span>
                                    <span>{formatDate(event.event_date)}</span>
                                </div>
                                <div style={{ ...detailStyle, marginBottom: '1rem' }}>
                                    <span>🎫</span>
                                    <span style={availableStyle(event.available_tickets)}>
                                        {event.available_tickets}/{event.total_tickets} tickets available
                                    </span>
                                </div>
                                <p style={priceStyle}>{formatPrice(event.price)}</p>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                    <Link 
                                        to={`/events/${event.id}`} 
                                        style={secondaryButtonStyle}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        View Details
                                    </Link>
                                    
                                    {event.available_tickets > 0 ? (
                                        <Link 
                                            to={`/booking/${event.id}`} 
                                            style={buttonStyle}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-1px)';
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events; 