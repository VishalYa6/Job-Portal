import express from "express";

import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/job.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();


// Recruiter routes
router.post("/", authenticate, authorizeRoles("recruiter"), createJob);
router.put("/:id", authenticate, authorizeRoles("recruiter"), updateJob);
router.delete("/:id", authenticate, authorizeRoles("recruiter"), deleteJob);


//Public routes 
router.get("/", getAllJobs);
router.get("/:id", getJobById);

export default router;