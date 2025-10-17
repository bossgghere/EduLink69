const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  thumbnailUrl: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalStudents: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  duration: { type: String, required: true },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  tags: [String],
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);