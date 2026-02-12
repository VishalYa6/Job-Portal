import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const appResponse = await axiosInstance.get(`/applications/${jobId}`);
        const jobResponse = await axiosInstance.get(`/jobs/${jobId}`);
        setApplications(appResponse.data);
        setJob(jobResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axiosInstance.put(`/applications/${jobId}`, {
        applicationId: appId,
        status: newStatus,
      });
      // Refresh applications
      const response = await axiosInstance.get(`/applications/${jobId}`);
      setApplications(response.data);
      alert('Application status updated!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/recruiter-dashboard')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Back to Dashboard
        </button>

        {job && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-blue-600 font-semibold text-lg">{job.company}</p>
            <p className="text-gray-600 mt-2">{job.location}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No applications for this job yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Applications ({applications.length})
            </h2>

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{application.applicant?.name}</h3>
                    <p className="text-gray-600">{application.applicant?.email}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleStatusUpdate(application._id, 'reviewed')}
                    disabled={application.status === 'reviewed'}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(application._id, 'accepted')}
                    disabled={application.status === 'accepted'}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(application._id, 'rejected')}
                    disabled={application.status === 'rejected'}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;
