import express from "express";
import { applyForJob,getApplicationsForJob, updateApplicationStatus, deleteApplication } from "../controllers/application.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";
import { getUserDashboard } from "../controllers/user.dashboard.controller.js";
import { getRecruiterDashboard } from "../controllers/application.recruiter.controller.js";

const router = express.Router();
//user dashboard route
router.get("/dashboard/user", authenticate, authorizeRoles("user"), getUserDashboard);
//recruiter dashboard route
router.get("/dashboard/recruiter", authenticate, authorizeRoles("recruiter"), getRecruiterDashboard);

// Applicant routes
router.post("/:jobId", authenticate, authorizeRoles("user"), applyForJob);
router.get("/:jobId", authenticate, authorizeRoles("recruiter"), getApplicationsForJob);
router.put("/:applicationId", authenticate, authorizeRoles("recruiter"), updateApplicationStatus);
router.delete("/:applicationId", authenticate, authorizeRoles("user"), deleteApplication);

export default router;