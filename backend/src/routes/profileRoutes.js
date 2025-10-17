const express = require('express');
const { getProfile, updateProfile, uploadResume } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // or configure cloud storage

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;