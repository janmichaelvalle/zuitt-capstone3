import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user.id !== null ? (
              <>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                {user.isAdmin && <Nav.Link as={Link} to="/products/add">Add Product</Nav.Link>}
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
