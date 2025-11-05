
import Navbar  from "react-bootstrap/Navbar";
import Container  from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css";
import { logout } from "../../services/authService.js";

const header = () => {

    const handleLogout = async() => {
        await logout();
        window.location.href = "/signin";
    }

    return (
        <>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand to="/"><strong>Employee Managment System</strong></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" className="nav-Link">Employee</Nav.Link>
                    <Nav.Link as={Link} to="/employee" className="nav-Link">Post employee</Nav.Link>
                    <button onClick={handleLogout} className="logout-button"
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
                    >Se déconnecter</button>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default header;