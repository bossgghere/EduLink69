const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name avatar')
      .sort('-createdAt');

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar');
    
    const lessons = await Lesson.find({ course: req.params.id }).sort('order');

    res.json({ success: true, course, lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.id
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Already enrolled' });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: req.params.id
    });

    await Course.findByIdAndUpdate(req.params.id, { $inc: { totalStudents: 1 } });

    res.status(201).json({ success: true, enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course', 'title thumbnailUrl instructor duration');

    res.json({ success: true, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.completeLesson = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.body.course_id
    });

    if (!enrollment.completedLessons.includes(req.params.lessonId)) {
      enrollment.completedLessons.push(req.params.lessonId);
      
      const totalLessons = await Lesson.countDocuments({ course: req.body.course_id });
      enrollment.progress = enrollment.completedLessons.length / totalLessons;
      
      if (enrollment.progress === 1) {
        enrollment.isCompleted = true;
        enrollment.completedDate = new Date();
      }
      
      await enrollment.save();
    }

    res.json({ success: true, enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
