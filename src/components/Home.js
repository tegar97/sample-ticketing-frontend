import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center'
    };

    const heroStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 2rem',
        borderRadius: '24px',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
    };

    const titleStyle = {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        marginBottom: '1.5rem',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        lineHeight: '1.1'
    };

    const subtitleStyle = {
        fontSize: '1.25rem',
        marginBottom: '2.5rem',
        opacity: 0.9,
        fontWeight: '400',
        maxWidth: '600px',
        margin: '0 auto 2.5rem auto'
    };

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
        fontWeight: '600',
        boxShadow: '0 4px 14px 0 rgba(15, 23, 42, 0.3)'
    };

    const featuresStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginTop: '4rem'
    };

    const featureStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '20px',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 0.3s ease',
        textAlign: 'left'
    };

    const featureTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#0f172a'
    };

    const featureDescStyle = {
        color: '#64748b',
        lineHeight: '1.6'
    };

    return (
        <div style={containerStyle}>
            <div style={heroStyle}>
                <h1 style={titleStyle}>Welcome to Event Ticketing System</h1>
                <p style={subtitleStyle}>
                    Discover amazing events and book your tickets easily
                </p>
                <Link 
                    to="/events" 
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px 0 rgba(15, 23, 42, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 14px 0 rgba(15, 23, 42, 0.3)';
                    }}
                >
                    Browse Events
                </Link>
            </div>

            <div style={featuresStyle}>
                <div 
                    style={featureStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h3 style={featureTitleStyle}>🎭 Discover Events</h3>
                    <p style={featureDescStyle}>Browse through a wide variety of events including concerts, workshops, and festivals with beautiful imagery and detailed information.</p>
                </div>
                
                <div 
                    style={featureStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h3 style={featureTitleStyle}>🎫 Easy Booking</h3>
                    <p style={featureDescStyle}>Simple and secure booking process with instant confirmation and real-time availability updates.</p>
                </div>
                
                <div 
                    style={featureStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h3 style={featureTitleStyle}>📱 Digital Tickets</h3>
                    <p style={featureDescStyle}>Get your tickets delivered instantly and access them from your device with unique QR codes for validation.</p>
                </div>
            </div>

            {!isAuthenticated && (
                <div style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '20px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '600' }}>Ready to get started?</h2>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                        <Link 
                            to="/register" 
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px 0 rgba(15, 23, 42, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 14px 0 rgba(15, 23, 42, 0.3)';
                            }}
                        >
                            Sign Up
                        </Link>
                        <Link 
                            to="/login" 
                            style={{ 
                                ...buttonStyle, 
                                background: 'transparent',
                                color: '#0f172a',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 14px 0 rgba(226, 232, 240, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.background = '#f8fafc';
                                e.target.style.boxShadow = '0 8px 25px 0 rgba(226, 232, 240, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.background = 'transparent';
                                e.target.style.boxShadow = '0 4px 14px 0 rgba(226, 232, 240, 0.3)';
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home; 