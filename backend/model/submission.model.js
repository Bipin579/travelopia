const mongoose= require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true,
    enum: [
      'India',
      'Africa',
      'Europe'
    ]
  },
  travellerCount: {
    type: Number,
    required: true
  },
  budgetPerPerson: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

module.exports = SubmissionModel;