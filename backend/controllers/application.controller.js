import Application from "../models/application.model.js";  
import Job from "../models/job.model.js";

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: req.user.id });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }
        const application = new Application({
            job: jobId,
            applicant: req.user.id
        });
        await application.save();
        res.status(201).json({ message: "Application submitted successfully", application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get applications for a job (recruiter)
export const getApplicationsForJob = async (req, res) => {
    try {   
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.recruiter.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const applications = await Application.find({ job: jobId }).populate("applicant", "name email");
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
        
//Update application status (recruiter)
export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const { status } = req.body;
        const application = await Application.findById(applicationId).populate("job");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.job.recruiter.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        application.status = status;
        await application.save();
        res.status(200).json({ message: "Application status updated successfully", application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete application (applicant)    
export const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.applicant.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await Application.findByIdAndDelete(req.params.applicationId);
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};