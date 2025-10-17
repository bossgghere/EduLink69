
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: String,
  description: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Remote', 'Onsite', 'Hybrid'], required: true },
  experienceLevel: { type: String, required: true },
  salaryRange: { type: String, required: true },
  skills: [String],
  requirements: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicationDeadline: Date,
  isActive: { type: Boolean, default: true },
  applicantsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
