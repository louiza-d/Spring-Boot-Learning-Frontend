

import { useState } from "react";
import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState ({
        name: "",
        email: "",
        phone: "",
        department : ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData ({
            ...formData,
            [name]: value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.error('Failed to create employee, status:', response.status);
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.replace('/signin');
                    return;
                }
                setError('Erreur lors de la création de l\'employé. Statut: ' + response.status);
                return;
            }
            try {
                const responseObj = await response.json();
                console.log('Employee created:', responseObj);
            } catch (parseError) {
                console.warn('Could not parse JSON response after creating employee:', parseError);
            }
            navigate('/');
        } catch (error) {
            console.error("Error creating employee:", error);
            setError('Erreur de connexion au serveur');
        }
    }

    return (
        <>
        <div className="center-form">
            <h1>Post new Employee</h1>
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "email"
                    name= "email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "phone"
                    placeholder="Enter phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Post Employee</Button>
            </Form>
        </div>
        </>
    )
}

export default PostUser;