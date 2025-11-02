import './UpdateUser.css';
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();

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

        useEffect (() => {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error.message);
                }
            }
            fetchUserData();
        }, [id])

    return (
         <>
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form >
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

                <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
            </Form>
        </div>
        </>
    )
}

export default UpdateUser;