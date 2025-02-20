import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import TopBar from "./components/TopBar";
import About from "./components/About";
import Policy from "./components/Policy";
import Home from "./screens/Home";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Mui from "./components/mui";
import Order from "./screens/Order";
import Admin from "./screens/Admin";
import Deletepizza from "./components/admin/Deletepizza";
import UpdatePizza from "./components/admin/Updatepizza";

function App() {
  return (
    <BrowserRouter>
      <TopBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/updatepizza/:id" element={<UpdatePizza />} />
        <Route path="/admin/deletepizza/:id" element={<Deletepizza />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginm" element={<Mui />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
