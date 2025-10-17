const express = require('express');
const { getJobs, getJobById, createJob, applyJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getJobs);
router.get('/:id', protect, getJobById);
router.post('/', protect, createJob);
router.post('/apply', protect, applyJob);

module.exports = router;
