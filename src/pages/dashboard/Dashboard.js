import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table  from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchEmployees = async () => {
            try {
                
                  const token = localStorage.getItem('token');
                const response = await fetch ("http://localhost:8080/api/employees", {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                if (!response.ok) {
                   
                    console.error('Error fetching employees, status:', response.status);
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem('token');
                        window.location.replace('/signin');
                    }
                    return;
                }
                const data = await response.json();

                setEmployees(data || []);
            } catch (error) {
                console.error("Error fetching employees:", error.message )
            };
        }

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if(response.ok){
                setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== employeeId)
            )
            

            console.log(`Employee with ID ${employeeId} deleted successfully`);
            return;
            }

            console.error('Failed to delete employee, status:', response.status);
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                window.location.replace('/signin');
            }
            
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    }


    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }

    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button variant="outline-warning" onClick={()=> handleUpdate(employee.id)}>Update</Button>{" "}
                                        <Button variant="outline-danger" onClick={()=> handleDelete(employee.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard;