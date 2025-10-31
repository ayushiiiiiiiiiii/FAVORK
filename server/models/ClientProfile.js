const mongoose = require('mongoose');

const ClientProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  company_name: {
    type: String,
  },
  industry: {
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

module.exports = mongoose.model('ClientProfile', ClientProfileSchema);
