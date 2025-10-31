const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Job = require('../models/Job');
const config = require('../config');

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (client-only)
router.post(
  '/',
  [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('price_inr', 'Price in INR is required and must be a number').isNumeric(),
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, price_inr, description } = req.body;

    try {
      const newJob = new Job({
        title,
        price_inr,
        description,
        user: req.user.id // Assign the job to the authenticated user
      });

      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ created_at: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs/:id/pay
// @desc    Client pays for job, mocks Razorpay escrow
// @access  Private (client-only)
router.post('/api/jobs/:id/pay', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Ensure only the job creator can pay for it
    if (job.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized to pay for this job' });
    }

    if (job.escrow_status !== 'created') {
      return res.status(400).json({ msg: 'Job is not in a payable state' });
    }

    const { razorpay_payment_id, razorpay_order_id } = req.body;
    if (!razorpay_payment_id || !razorpay_order_id) {
      return res.status(400).json({ msg: 'Missing Razorpay payment details' });
    }

    job.escrow_status = 'locked';
    job.razorpay_order_id = razorpay_order_id;
    job.razorpay_payment_id = razorpay_payment_id;

    await job.save();

    res.json({ msg: 'Funds locked successfully', job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs/:id/submit-work
// @desc    Freelancer submits work
// @access  Private (freelancer-only)
router.post('/api/jobs/:id/submit-work', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Add role-based authorization: Only a freelancer can submit work
    if (req.user.role !== 'freelancer') {
        return res.status(403).json({ msg: 'Forbidden: Only freelancers can submit work' });
    }

    if (job.escrow_status !== 'locked') {
      return res.status(400).json({ msg: 'Job is not in a state to accept work submission' });
    }

    const { work_url } = req.body;

    if (!work_url) {
      return res.status(400).json({ msg: 'Work URL is required' });
    }

    job.work_url = work_url;
    job.escrow_status = 'submitted';

    await job.save();

    res.json({ msg: 'Work submitted successfully', job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs/:id/approve-payment
// @desc    Client approves work and releases payment
// @access  Private (client-only)
router.post('/api/jobs/:id/approve-payment', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Ensure only the job creator can approve payment
    if (job.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized to approve payment for this job' });
    }

    if (job.escrow_status !== 'submitted') {
      return res.status(400).json({ msg: 'Job is not in a state to approve payment' });
    }

    job.escrow_status = 'released';

    await job.save();

    res.json({ msg: 'Payment released successfully', job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
