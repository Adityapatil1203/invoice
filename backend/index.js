const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const invoiceRoutes = require("./routes/invoiceRoutes.js");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected Successfully");
  } catch (error) {
    console.log("Error Connecting to Db ", error);
  }
};

connectDb();

// Routes
app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
