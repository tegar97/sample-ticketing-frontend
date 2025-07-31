import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '2rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
    };

    const logoStyle = {
        color: '#0f172a',
        fontSize: '1.5rem',
        fontWeight: '700',
        textDecoration: 'none',
        letterSpacing: '-0.025em'
    };

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        listStyle: 'none'
    };

    const linkStyle = {
        color: '#64748b',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        fontSize: '0.875rem',
        fontWeight: '500'
    };

    const linkHoverStyle = {
        ...linkStyle,
        color: '#0f172a',
        backgroundColor: '#f1f5f9'
    };

    const buttonStyle = {
        ...linkStyle,
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500'
    };

    const userNameStyle = {
        color: '#475569',
        fontSize: '0.875rem',
        fontWeight: '500',
        padding: '0 0.5rem'
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                <Link to="/" style={logoStyle}>
                    Event Ticketing
                </Link>
                
                <ul style={navLinksStyle}>
                    <li>
                        <Link 
                            to="/events" 
                            style={linkStyle}
                            onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
                            onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
                        >
                            Events
                        </Link>
                    </li>
                    
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link 
                                    to="/my-bookings" 
                                    style={linkStyle}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
                                >
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/my-tickets" 
                                    style={linkStyle}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
                                >
                                    My Tickets
                                </Link>
                            </li>
                            <li style={userNameStyle}>Welcome, {user?.name}</li>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    style={buttonStyle}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link 
                                    to="/login" 
                                    style={linkStyle}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/register" 
                                    style={buttonStyle}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 