const express = require("express");
const { connectMongoose } = require("./src/config/db");
require("dotenv").config();
const cors = require("cors");
const submissionRoute = require("./src/routes/submission.route");


const app = express();

// Connect to the database
connectMongoose();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/submission", submissionRoute);

// default
app.get("/", (req, res) => {
  res.send("Welcome to travelopia!");
});


// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
