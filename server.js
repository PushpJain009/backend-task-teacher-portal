const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["x-auth-token", "Content-Type", "Authorization"], // Ensure 'x-auth-token' is included here
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", studentRoutes);
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
