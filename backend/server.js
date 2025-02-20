const express = require("express");
const connectdb = require("./config/config"); // Ensure this path is correct
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose"); // Ensure Mongoose is imported
const fs = require("fs");
const path = require("path");

dotenv.config();

const corsOptions = {
  origin: "https://food-delivery-app-i5kf.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

connectdb();

// Mongoose Timeout Fix (Increase Connection Timeout)
mongoose.set("bufferCommands", false);
mongoose.set("serverSelectionTimeoutMS", 5000); // Reduce to 5s instead of 10s

const __dirname = path.resolve();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Disable caching for API responses
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Routes
app.use("/api/pizza", require("./routes/pizzaRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/payment", require("./routes/placeorder"));

// Serve frontend build
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from server side");
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
