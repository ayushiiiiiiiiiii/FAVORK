const mongoose = require('mongoose');

const FreelancerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  portfolio_url: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FreelancerProfile', FreelancerProfileSchema);
