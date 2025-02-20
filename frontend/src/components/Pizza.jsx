import React, { useState } from "react";
import { Card, Row, Col, Modal } from "react-bootstrap";
import { FaPizzaSlice, FaCartPlus } from "react-icons/fa";
import "../components/pizza.css";
import { useCart } from "../context/cart";
import { useSelector } from "react-redux";

const Pizza = ({ pizza }) => {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarients] = useState("small");
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const pizzastate = useSelector(state => state.getAllPizzaReducer)

  const { loading, pizzas, error } = pizzastate;

  return (
    <>
      <Card className="pizza-card" style={{ marginTop: "20px" }}>
        <Card.Img
          variant="top"
          src={pizza.image}
          alt={pizza.name}
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title>
            <FaPizzaSlice style={{ marginRight: "10px" }} />
            {pizza.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {pizza.category}
          </Card.Subtitle>
          <Card.Text
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1", marginRight: "10px" }}>
              <h6>Variants</h6>
              <select
                className="form-select"
                value={varient}
                onChange={(e) => setVarients(e.target.value)}
              >
                {pizza.varients.map((varient) => (
                  <option key={varient}>{varient}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: "1", marginLeft: "10px", color: "yellow" }}>
              <h6>Quantity</h6>
              <select
                className="form-select"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((v, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </Card.Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1", marginRight: "1px", color: "green" }}>
              <Row className="price-row">
                <Col md={6}>Price: ₹{pizza.prices[0][varient] * quantity}</Col>
              </Row>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCart([...cart, pizza]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, pizza])
                  );
                }}
              >
                <FaCartPlus style={{ marginRight: "5px" }} />
                Add to Cart
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "250px" }}>
            <Card.Img variant="top" src={pizza.image} alt={pizza.name} />
            <h6 style={{ color: "grey" }}>Description:{pizza.description}</h6>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Pizza;
