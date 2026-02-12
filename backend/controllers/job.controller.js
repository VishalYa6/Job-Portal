import Job from "../models/job.model.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, skills } = req.body;
    const newJob = new Job({
        title,
        description,
        company,
        location,
        salary,
        skills,
        recruiter: req.user.id
    });
    await newJob.save();
    res.status(201).json({
        message: "Job created successfully",
        newJob
    });
    console.log(req.user)
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name email");
    res.status(200).json(jobs);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

//Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiter", "name email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

// Update a job
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.recruiter.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { title, description, company, location, salary, skills } = req.body;
        job.title = title || job.title;
        job.description = description || job.description;
        job.company = company || job.company;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.skills = skills || job.skills;
        await job.save();
        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.recruiter.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Job deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};