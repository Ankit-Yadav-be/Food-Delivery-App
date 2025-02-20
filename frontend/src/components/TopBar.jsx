import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GiFullPizza } from "react-icons/gi";
import { MdDiscount } from "react-icons/md";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/cart";
import "../components/topbar.css";
import { useAuth } from "../context/auth";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    const handlelogout = async () => {
        setAuth({
            ...auth,
            user: null,

        });

        localStorage.removeItem("auth");
    }
   const navigate = useNavigate();
    const handleorder = ()=>{
        navigate("/order");
    }

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            className="topbar"
        >
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <GiFullPizza className="pizza-icon" />
                    <span className="ms-2">PIZZA SHOP</span>
                </Navbar.Brand>
                <h6 className="d-flex align-items-center">
                    <MdDiscount />
                    <span className="ms-2">new pizza is available at 35% off</span>
                </h6>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                   
                </Navbar.Collapse>
                <Nav className="ms-auto">
                        {/* Unique styling for Login */}

                        {
                            !auth.user ? (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link className="nav-link">

                                            <span className="ms-1">Login</span>
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link className="nav-link">

                                            <span className="ms-1">Register</span>
                                        </Nav.Link>
                                    </LinkContainer>

                                </>) : (
                                <>

                                    <Dropdown style={{ marginTop: "9px", marginRight: "40px"  }}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {auth.user.name}
                                        </Dropdown.Toggle>
                                        <LinkContainer to="/login" >
                                            <Nav.Link className="nav-link">
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
                                                    <Dropdown.Item onClick={handleorder}>Orders</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Nav.Link>
                                        </LinkContainer>
                                    </Dropdown>



                                </>)
                        }
                        {/* Unique styling for Cart */}
                        <LinkContainer to="/cart" style={{ color: "white" }}>
                            <Nav.Link className="nav-link cart-link">
                                <FiShoppingCart className="nav-icon" />{" "}

                                <Badge count={cart?.length} >
                                    c
                                </Badge>
                            </Nav.Link>
                        </LinkContainer>

                        {/* Normal styling for other links */}
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/policy">
                            <Nav.Link>Terms and Policy</Nav.Link>
                        </LinkContainer>
                    </Nav>
            </Container>
        </Navbar>
    );
};

export default TopBar;
