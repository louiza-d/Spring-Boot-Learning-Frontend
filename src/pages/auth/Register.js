import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
//import { useAuth } from '../../context/AuthContext';
import './Register.css';
import Notification from '../../components/Notification';


const Register = () => {
    const navigate = useNavigate();
    //const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const [notification, setNotification] = useState({
        message: '',
        type: 'success'
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.status === 201) {
                 setNotification({
                    message: 'Email de confirmation envoyé ! Vérifiez votre boîte mail.',
                    type: 'success'
                }); 
               // navigate('');
            } else {
                const errorData = await response.json();
                setNotification({
                    message : errorData.message || 'Erreur lors de l\'inscription',
                    type: 'danger'
                });
            }
        } catch (error) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Inscription Admin</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification({ message: '', type: 'success' })} 
                />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nom d'utilisateur"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        S'inscrire
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/signin">Déjà inscrit ? Connectez-vous</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;