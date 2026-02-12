import Application from "../models/application.model.js";

export const getUserDashboard = async (req, res) => {
  try {
    
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "title location salary company")
      .sort({ createdAt: -1 });
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === "applied").length;
    const reviewedApplications = applications.filter(app => app.status === "reviewed").length;
    const acceptedApplications = applications.filter(app => app.status === "accepted").length;
    const rejectedApplications = applications.filter(app => app.status === "rejected").length;
    res.status(200).json({ 
      message: "User dashboard retrieved successfully", 
      stats:{
        totalApplications,
      pendingApplications,
      reviewedApplications,
      acceptedApplications,
      rejectedApplications

      },
       recentApplications: applications.slice(0, 5)   
      
    }
    
);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
