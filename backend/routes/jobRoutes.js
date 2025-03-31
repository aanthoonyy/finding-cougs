const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// GET /jobs - list all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).send('Something Went Wrong');
  }
});

// POST /jobs - create a new job (optional, for job posting)
router.post('/jobs', async (req, res) => {
  try {
    const { title, description, company } = req.body;
    const job = new Job({ title, description, company });
    await job.save();
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).send('Something Went Wrong');
  }
});

// POST /jobs/:jobId/apply - apply for a job
router.post('/jobs/:jobId/apply', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (!job.applicants.includes(userId)) {
      job.applicants.push(userId);
      await job.save();
    }

    res.json({ success: true, job });
  } catch (err) {
    console.error('Error applying for job:', err);
    res.status(500).send('Something Went Wrong');
  }
});

module.exports = router;
