const Job = require("../models/job");

// @desc Get all jobs
exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
};

// @desc Get single job
exports.getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.status(200).json(job);
};

// @desc Add a job
exports.addJob = async (req, res) => {
  const { company, position, status, appliedDate, notes } = req.body;
  if (!company || !position) {
    return res.status(400).json({ message: "Company and position are required" });
  }

  const job = await Job.create({ company, position, status, appliedDate, notes });
  res.status(201).json(job);
};

// @desc Update a job
exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedJob);
};

// @desc Delete a job
exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  await job.deleteOne();
  res.status(200).json({ id: req.params.id });
};
