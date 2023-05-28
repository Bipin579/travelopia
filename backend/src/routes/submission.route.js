const express = require("express");
const route = express.Router();
const {
  getSubmissions,
  postSubmissions,
  getCSV,
} = require("../controller/submission.controller");


route.get("/", getSubmissions);
route.post("/post-data", postSubmissions);
route.get("/download-csv", getCSV);

module.exports = route;
