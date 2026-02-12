import axiosInstance from './axiosInstance';

export const applicationService = {
  applyForJob: async (jobId) => {
    const response = await axiosInstance.post(`/applications/${jobId}`);
    return response.data;
  },

  getApplicationsForJob: async (jobId) => {
    const response = await axiosInstance.get(`/applications/${jobId}`);
    return response.data;
  },

  updateApplicationStatus: async (jobId, statusData) => {
    const response = await axiosInstance.put(`/applications/${jobId}`, statusData);
    return response.data;
  },

  deleteApplication: async (applicationId) => {
    const response = await axiosInstance.delete(`/applications/${applicationId}`);
    return response.data;
  },

  getUserDashboard: async () => {
    const response = await axiosInstance.get('/applications/dashboard/user');
    return response.data;
  },

  getRecruiterDashboard: async () => {
    const response = await axiosInstance.get('/applications/dashboard/recruiter');
    return response.data;
  },
};
