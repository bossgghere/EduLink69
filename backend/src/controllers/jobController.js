const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .sort('-createdAt')
      .limit(50);

    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const existing = await JobApplication.findOne({
      job: req.body.job_id,
      user: req.user._id
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Already applied' });
    }

    const application = await JobApplication.create({
      job: req.body.job_id,
      user: req.user._id,
      resumeUrl: req.body.resume_url,
      coverLetter: req.body.cover_letter
    });

    await Job.findByIdAndUpdate(req.body.job_id, { $inc: { applicantsCount: 1 } });

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
