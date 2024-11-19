require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database.");
    // Synchronize models but prevent unnecessary changes to the existing tables
    return sequelize.sync({ force: false, alter: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
