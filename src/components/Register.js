import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
        
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    const containerStyle = {
        maxWidth: '450px',
        margin: '3rem auto',
        padding: '0 2rem'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '3rem',
        borderRadius: '24px',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: '2rem',
        letterSpacing: '-0.025em'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    };

    const inputStyle = {
        padding: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '1rem',
        backgroundColor: 'rgba(248, 250, 252, 0.8)',
        transition: 'all 0.2s ease',
        outline: 'none'
    };

    const inputFocusStyle = {
        borderColor: '#0f172a',
        backgroundColor: 'white',
        boxShadow: '0 0 0 3px rgba(15, 23, 42, 0.1)'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '1rem',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '600'
    };

    const errorStyle = {
        color: '#dc2626',
        fontSize: '0.875rem',
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(220, 38, 38, 0.2)'
    };

    const linkStyle = {
        textAlign: 'center',
        marginTop: '1.5rem',
        color: '#64748b',
        fontSize: '0.875rem'
    };

    const linkTextStyle = {
        color: '#0f172a',
        textDecoration: 'none',
        fontWeight: '600'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Create Account</h2>
                
                {error && <div style={errorStyle}>{error}</div>}
                
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                    
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            background: loading ? '#e2e8f0' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            color: loading ? '#94a3b8' : 'white',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(15, 23, 42, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                
                <div style={linkStyle}>
                    Already have an account? <Link to="/login" style={linkTextStyle}>Sign in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register; 