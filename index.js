const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Route Imports
const userRoutes = require("./routes/users.routes");
const supplementRoutes = require("./routes/supplements.routes");
const authRoutes = require("./routes/auth.routes");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://nutritrack-organizer.netlify.app", process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Public Route - accessible to everyone
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Use routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/supplements", supplementRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
