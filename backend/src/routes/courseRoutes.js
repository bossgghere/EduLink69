const express = require('express');
const {
  getCourses,
  getCourseById,
  enrollCourse,
  getUserEnrollments,
  completeLesson
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);
router.post('/:id/enroll', protect, enrollCourse);
router.get('/my/enrollments', protect, getUserEnrollments);
router.put('/lessons/:lessonId/complete', protect, completeLesson);

module.exports = router;
