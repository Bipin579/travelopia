const express = require("express");
const route = express.Router();
const {
  getSingleSubmission,
  getSubmissions,
  postSubmissions,
  getCSV,
} = require("../controller/submission.controller");


route.get("/", getSubmissions);
route.post("/post-data", postSubmissions);
route.get("/download-csv", getCSV);
route.get("/:id", getSingleSubmission);

module.exports = route;
