import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    console.log('Login successful, token=', data.token);
                    login(data.token);
                    
                    window.location.replace('/');
                } else {
                    console.warn('No token returned from login response', data);
                    navigate('/');
                }
            } else {
                setError('Email ou mot de passe incorrect');
            }
        } catch (error) {
            setError('Erreur de connexion');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Connexion Admin</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Se connecter
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/register">Pas encore inscrit ? Créer un compte</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;