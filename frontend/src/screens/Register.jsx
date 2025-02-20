import React, { useState } from 'react';
import { Container, Button, Form, Alert } from "react-bootstrap";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { name, email, password, confirmpassword };
        const res = await axios.post("http://localhost:8000/api/user/register",
            {
                name, email, password, confirmpassword
            }
        )
        if (res.data.success) {
            navigate("/login");
        }

    };

    return (
        <>

            <Container style={containerStyle}>
                <Form style={formStyle} onSubmit={handleSubmit}>
                    <h2 style={headerStyle}>Create Your Account</h2>

                    {error && <Alert variant="danger" style={alertStyle}>{error}</Alert>}

                    <Form.Group controlId="formBasicName">
                        <Form.Label style={labelStyle}>
                            <AiOutlineUser style={iconStyle} /> Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={inputStyle}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={labelStyle}>
                            <AiOutlineMail style={iconStyle} /> Email Address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                        <Form.Text style={textStyle}>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={labelStyle}>
                            <AiOutlineLock style={iconStyle} /> Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label style={labelStyle}>
                            <AiOutlineLock style={iconStyle} /> Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmpassword}
                            onChange={e => setConfirmpassword(e.target.value)}
                            style={inputStyle}
                        />
                    </Form.Group>

                    <Button variant="primary" type='submit' style={buttonStyle}>
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    );
};

const containerStyle = {
    marginTop: "50px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif"
};

const formStyle = {
    maxWidth: "500px",
    margin: "0 auto"
};

const headerStyle = {
    marginBottom: "25px",
    textAlign: "center",
    color: "#007bff",
    fontWeight: "700",
    fontSize: "32px"
};

const labelStyle = {
    fontWeight: "600",
    color: "#343a40",
    fontSize: "18px",
    display: "flex",
    alignItems: "center"
};

const inputStyle = {
    borderRadius: "5px",
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ced4da",
    marginBottom: "20px",
    transition: "border-color 0.3s",
    width: "100%",
    boxShadow: "0px 0px 6px 0px #e2e2e2"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    fontWeight: "700",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)"
};

const alertStyle = {
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "600"
};

const textStyle = {
    fontSize: "14px",
    color: "grey",
};

const iconStyle = {
    marginRight: "10px",
    fontSize: "20px",
    color: "#007bff"
};


export default Register;
