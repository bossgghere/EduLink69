const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Accepted'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
