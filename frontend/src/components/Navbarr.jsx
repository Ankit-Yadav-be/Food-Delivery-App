// NavbarComponent.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FiUser } from 'react-icons/fi'; // Import icons from react-icons
import "../components/nav.css";
import { useCart } from '../context/cart';
const Navbarr = () => {

    const [cart, setCart] = useCart();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="topbar">
            <Container>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/login">
                            <Nav.Link className="nav-link">
                                <FiUser className="nav-icon" /> Login
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link className="nav-link">
                                Cart:{cart.length}
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarr;
