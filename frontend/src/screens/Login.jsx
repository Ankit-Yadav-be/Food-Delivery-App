import axios from 'axios';
import React, { useState } from 'react';
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://food-delivery-app-i5kf.onrender.com/api/user/login", { email, password });
    setAuth({ ...auth, user: res.data.user });
    localStorage.setItem("auth", JSON.stringify(res.data));
    navigate("/");
  };

  return (
    <Container style={{ marginTop: '50px', maxWidth: '500px', background: '#f8f9fa', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            <FaUser style={{ marginRight: '10px', verticalAlign: 'middle' }} />Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '10px', fontSize: '1em' }}
          />
          <Form.Text className="text-muted" style={{ fontSize: '0.9em', color: '#6c757d' }}>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            <FaLock style={{ marginRight: '10px', verticalAlign: 'middle' }} />Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '10px', fontSize: '1em' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            fontSize: '1em',
            padding: '10px 20px',
            marginTop: '20px',
            width: '100%',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
