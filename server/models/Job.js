const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price_inr: {
    type: Number,
    required: true,
  },
  escrow_status: {
    type: String,
    enum: ['created', 'locked', 'submitted', 'released'],
    default: 'created',
  },
  work_url: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);
