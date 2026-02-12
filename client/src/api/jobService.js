import axiosInstance from './axiosInstance';

export const jobService = {
  getAllJobs: async () => {
    const response = await axiosInstance.get('/jobs');
    return response.data;
  },

  getJobById: async (jobId) => {
    const response = await axiosInstance.get(`/jobs/${jobId}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await axiosInstance.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (jobId, jobData) => {
    const response = await axiosInstance.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  deleteJob: async (jobId) => {
    const response = await axiosInstance.delete(`/jobs/${jobId}`);
    return response.data;
  },
};
