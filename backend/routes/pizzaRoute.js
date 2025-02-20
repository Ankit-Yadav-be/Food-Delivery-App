const express = require("express");
const pizzaModel = require("../models/pizzaModel");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all pizzas
router.get("/getallpizza", async (req, res) => {
  try {
    const data = await pizzaModel.find({});
    res.send({ data });
  } catch (error) {
    res.json({ message: error });
  }
});

// Add new pizza
router.post("/addpizza", upload.single("image"), async (req, res) => {
  try {
    const { name, prices, varients, description, category } = req.body;
    const image = req.file ? req.file.path : ""; // Handle file path

    const newPizza = new pizzaModel({
      name,
      prices: JSON.parse(prices),
      varients: JSON.parse(varients),
      description,
      image,
      category,
    });

    await newPizza.save();
    res.status(201).json({ success: true, message: "Pizza added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add pizza" });
  }
});

// Update existing pizza
router.post("/updatepizza/:id", upload.single("image"), async (req, res) => {
  try {
    const pizzaId = req.params.id;
    const { name, prices, varients, description, category } = req.body;
    const image = req.file ? req.file.path : null; // Handle file path if image is uploaded

    // Create an object to hold the updated data
    const updatedData = {
      name,
      prices: JSON.parse(prices),
      varients: JSON.parse(varients),
      description,
      category,
    };

    // Include the image field if an image was uploaded
    if (image) {
      updatedData.image = image;
    }

    console.log('Pizza ID:', pizzaId);
    console.log('Updated Data:', updatedData);

    const updatedPizza = await pizzaModel.findByIdAndUpdate(pizzaId, updatedData, { new: true });

    if (updatedPizza) {
      res.status(200).json(updatedPizza);
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }
  } catch (error) {
    console.error('Error updating pizza:', error);
    res.status(500).json({ message: 'Error updating pizza', error: error.message });
  }
});

router.delete("/deletepizza/:id", async (req, res) => {
  try {
    const pizzaId = req.params.id;

    // Find the pizza to delete
    const pizzaToDelete = await pizzaModel.findById(pizzaId);

    if (!pizzaToDelete) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    // Delete the pizza from the database
    await pizzaModel.findByIdAndDelete(pizzaId);

    // Optionally, delete the associated image file
    if (pizzaToDelete.image) {
      const imagePath = path.join(__dirname, '../uploads/', path.basename(pizzaToDelete.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        }
      });
    }

    res.status(200).json({ message: 'Pizza deleted successfully' });
  } catch (error) {
    console.error('Error deleting pizza:', error);
    res.status(500).json({ message: 'Error deleting pizza', error: error.message });
  }
});


  router.post("/search" ,async(req,res)=>{
    try {
      const keywords = req.query.search
        ? {
            $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { name: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
      const users = await pizzaModel.find(keywords);
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "something went wrong to find users ",
      });
    }
  })

module.exports = router;
