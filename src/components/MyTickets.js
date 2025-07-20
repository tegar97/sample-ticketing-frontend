import React, { useState, useEffect } from 'react';
import { ticketingService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyTickets = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchTickets();
        }
    }, [user]);

    const fetchTickets = async () => {
        try {
            const response = await ticketingService.getUserTickets(user.id);
            setTickets(response.data.tickets);
        } catch (err) {
            setError('Failed to load tickets');
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'valid': return '#2ecc71';
            case 'used': return '#f39c12';
            case 'expired': return '#e74c3c';
            default: return '#7f8c8d';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'valid': return '✅';
            case 'used': return '🎫';
            case 'expired': return '❌';
            default: return '❓';
        }
    };

    const containerStyle = {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem'
    };

    const ticketCardStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '2px dashed #ddd'
    };

    const ticketCodeStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        padding: '0.5rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontFamily: 'monospace'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <h1>Loading your tickets...</h1>
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
            <h1>My Tickets</h1>
            
            {tickets.length === 0 ? (
                <p>You don't have any tickets yet.</p>
            ) : (
                tickets.map((ticket) => (
                    <div key={ticket.id} style={ticketCardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3>{ticket.event_title}</h3>
                                <p>📍 {ticket.event_venue}</p>
                                <p>📅 {formatDate(ticket.event_date)}</p>
                            </div>
                            
                            <div style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                backgroundColor: getStatusColor(ticket.status),
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                {getStatusIcon(ticket.status)} {ticket.status}
                            </div>
                        </div>
                        
                        <div style={ticketCodeStyle}>
                            🎫 {ticket.ticket_code}
                        </div>
                        
                        <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#7f8c8d',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '1rem'
                        }}>
                            <span>Ticket ID: {ticket.id}</span>
                            <span>Issued: {formatDate(ticket.created_at)}</span>
                        </div>
                        
                        {ticket.status === 'valid' && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.5rem',
                                backgroundColor: '#d5f4e6',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: '#27ae60'
                            }}>
                                💡 Present this ticket code at the venue for entry
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyTickets; 