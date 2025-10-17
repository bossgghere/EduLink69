const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['name', 'bio', 'location', 'phoneNumber', 'avatar', 'skills'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resumeUrl: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json({ success: true, resumeUrl: user.resumeUrl });
  }catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};