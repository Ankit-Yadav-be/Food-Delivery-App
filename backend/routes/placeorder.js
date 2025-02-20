const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51PX0dPRpmCuAmYqn7diCVnhZ0H3DJPvIM6uZhILWHhgp6a4rGbMNEv6DJel6fZInDfcMlCiajW7PPBLHcvuipo2E00UN5qn83J"
);
const router = express.Router();
const Order = require("../models/ordermodel");

router.post("/order", async (req, res) => {
  const { token, auth, cartitem, price } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: auth.user.name,
        email: auth.user.email,
        userid: auth.user._id,
        orderitems: cartitem,
        orderAmount: price,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionid: payment.id,
      });

      await newOrder.save();

      res.status(200).send({ message: "Payment successful", order: newOrder });
    } else {
      return res.status(500).send("Payment failed");
    }
  } catch (error) {
    console.error("Error processing order:", error);
    return res.status(400).json({
      message: "Something went wrong",
      error,
    });
  }
});

router.post("/getorder", async (req, res) => {
  const { userid } = req.body;
  const getorderdata = await Order.find({ userid });
  if (getorderdata) {
    res.status(200).send(getorderdata);
  } else {
    res.status(400).send("orders not found from database");
  }
});

router.get("/allorders", async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders) {
      res.status(200).send(orders);
    } else {
      res.status(300).send("order not fetched from  database");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/deliver", async (req, res) => {
  try {
    const { orderid } = req.body;

    if (!orderid || typeof orderid !== "string") {
      return res.status(400).send("Invalid order ID");
    }

    const orderObjectId = new mongoose.Types.ObjectId(orderid);

    const order = await Order.findById(orderObjectId);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Update the order status to delivered
    order.isDelivered = true;
    await order.save();

    res.send("Order marked as delivered");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
