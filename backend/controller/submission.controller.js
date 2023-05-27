const SubmissionModel = require("../model/submission.model");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

const maxSubmissionsPerPage = 10;

const getSubmissions = async (req, res) => {
  const pageNumber = parseInt(req.query.page || 0);
  const total = Math.ceil(
    (await SubmissionModel.countDocuments()) / maxSubmissionsPerPage
  );
  const submissions = await SubmissionModel.find({})
    .sort({ createdAt: -1 })
    .skip(pageNumber * maxSubmissionsPerPage)
    .limit(maxSubmissionsPerPage);

  res.json({
    submissions,
    page: pageNumber,
    total,
  });
};

const postSubmissions = async (req, res) => {
  try {
    const submissionData = req.body;
    const submission = new SubmissionModel(submissionData);

    await submission.save();
    res.json(submission);
  } catch(err) {
    res.status(500).send({err:err.message});
  }
};

// controller.get('/:id',
const getSingleSubmission = async (req, res) => {
  try {
    const submission = await SubmissionModel.findById(req.params.id);
    res.json(submission);
  } catch (err) {
    res.status(404).send("Submission not found!");
  }
};





const getCSV = async (req, res) => {
  try {
    // Find all submissions from the database
    const submissions = await SubmissionModel.find();

    // Define the CSV writer and the file path
    const csvWriter = createCsvWriter({
      path: "submission_master.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "destination", title: "Destination" },
        { id: "travellerCount", title: "Traveller Count" },
        { id: "budgetPerPerson", title: "Budget Per Person" },
        { id: "createdAt", title: "Created At" },
        { id: "updatedAt", title: "Updated At" },
      ],
    });

    // Map the submission data to match the CSV header fields
    const records = submissions.map((submission) => ({
      name: submission.name,
      email: submission.email,
      destination: submission.destination,
      travellerCount: submission.travellerCount,
      budgetPerPerson: submission.budgetPerPerson,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    }));

    // Write the records to the CSV file
    await csvWriter.writeRecords(records);

    // Read the CSV file data
    const filePath = __dirname + "/../submission_master.csv";
    const csvData = fs.readFileSync(filePath, "utf8");

    // Set the appropriate headers for the CSV response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=submission_master.csv");

    // Send the CSV data as a response to the frontend
    res.send(csvData);
  } catch (error) {
    console.error("Error exporting Submission Master data:", error);
    res.status(500).send("Error exporting Submission Master data");
  }
};



module.exports ={getSingleSubmission,postSubmissions,getSubmissions, getCSV};
