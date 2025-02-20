const express = require("express");
const connectdb = require("../server/config/config"); // Ensure this path is correct
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

dotenv.config();
connectdb();
const _dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/pizza", require("./routes/pizzaRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/payment", require("./routes/placeorder"));

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.get("/", (req, res) => {
  res.send("hello from server side");
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
