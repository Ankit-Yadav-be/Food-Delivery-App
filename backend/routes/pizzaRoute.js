import express from "express";
import upload from "../middleware/uploads.js"; // ✅ Import Multer with Cloudinary Storage
import pizzaModel from "../models/pizzaModel.js";

const router = express.Router();

// ✅ Get all pizzas
router.get("/getallpizza", async (req, res) => {
  try {
    const data = await pizzaModel.find({});
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add new pizza with Cloudinary image upload
router.post("/addpizza", upload.single("image"), async (req, res) => {
  try {
    const { name, prices, varients, description, category } = req.body;
    if (!name || !prices || !varients || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? req.file.path : ""; // ✅ Cloudinary image URL

    const newPizza = new pizzaModel({
      name,
      prices: JSON.parse(prices),
      varients: JSON.parse(varients),
      description,
      category,
      image: imageUrl,
    });

    await newPizza.save();
    res.status(201).json({ success: true, message: "Pizza added successfully!", data: newPizza });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add pizza", error: error.message });
  }
});

// ✅ Update existing pizza with Cloudinary image upload
router.post("/updatepizza/:id", upload.single("image"), async (req, res) => {
  try {
    const pizzaId = req.params.id;
    const { name, prices, varients, description, category } = req.body;

    const updatedData = {
      name,
      prices: JSON.parse(prices),
      varients: JSON.parse(varients),
      description,
      category,
    };

    if (req.file) {
      updatedData.image = req.file.path; // ✅ Update image URL if new image uploaded
    }

    const updatedPizza = await pizzaModel.findByIdAndUpdate(pizzaId, updatedData, { new: true });

    if (updatedPizza) {
      res.status(200).json(updatedPizza);
    } else {
      res.status(404).json({ message: "Pizza not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating pizza", error: error.message });
  }
});

// ✅ Delete pizza
router.delete("/deletepizza/:id", async (req, res) => {
  try {
    const pizzaId = req.params.id;

    const pizzaToDelete = await pizzaModel.findById(pizzaId);

    if (!pizzaToDelete) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    await pizzaModel.findByIdAndDelete(pizzaId);

    res.status(200).json({ message: "Pizza deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pizza", error: error.message });
  }
});

// ✅ Search pizza
router.post("/search", async (req, res) => {
  try {
    const keywords = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const pizzas = await pizzaModel.find(keywords);
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error finding pizzas", error: error.message });
  }
});

export default router;
