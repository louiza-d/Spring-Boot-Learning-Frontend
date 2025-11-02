

import { useState } from "react";
import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PsotUser = () => {

    const [formData, setFormData] = useState ({

        name: "",
        email: "",
        phone: "",
        department : ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData ({
            ...formData,
            [name]: value,
        })
    }

    return (
        <>
        <div className="center-form">
            <h1>Post new Employee</h1>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "name"
                    placeholder="Enter name"
                    value={FormData.name}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "email"
                    name= "email"
                    placeholder="Enter email"
                    value={FormData.email}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "phone"
                    placeholder="Enter phone"
                    value={FormData.phone}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control 
                    type= "text"
                    name= "department"
                    placeholder="Enter department"
                    value={FormData.department}
                    onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100"></Button>
            </Form>
        </div>
        </>
    )
}

export default PsotUser;