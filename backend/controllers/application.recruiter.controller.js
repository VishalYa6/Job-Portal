import mongoose from 'mongoose';
import Job from '../models/job.model.js';
import Application from '../models/application.model.js';

export const getRecruiterDashboard = async (req, res) => {
    try{
const recruiterId = req.user.id;    
const jobs = await Job.find({ recruiter: recruiterId });
const jobIds = jobs.map(job => job._id);
const applications = await Application.find({ job: { $in: jobIds } }).populate("job", "title").populate("applicant", "name email");
const totalJobs = jobs.length;
const totalApplications = applications.length;
const recentApplications = applications.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
res.status(200).json({
message: "Recruiter dashboard retrieved successfully",
stats: {totalJobs, totalApplications }, recentApplications }); } catch (error) { res.status(500).json({ message: error.message }); }

    }