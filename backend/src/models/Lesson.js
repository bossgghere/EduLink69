const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: String,
  order: { type: Number, required: true },
  duration: { type: String, required: true },
  isFree: { type: Boolean, default: false },
  resources: [String]
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
