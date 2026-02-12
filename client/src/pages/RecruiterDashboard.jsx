import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllJobs, deleteJobAction } from '../store/jobSlice';

const RecruiterDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  // Filter jobs posted by current recruiter
  const recruiterJobs = jobs.filter((job) => job.recruiter._id === user?._id);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJobAction(jobId));
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleViewApplications = (jobId) => {
    navigate(`/job-applications/${jobId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Recruiter Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
          </div>
          <button
            onClick={() => navigate('/create-job')}
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            + Post New Job
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading your jobs...</p>
          </div>
        ) : recruiterJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't posted any jobs yet.</p>
            <button
              onClick={() => navigate('/create-job')}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase">Total Jobs Posted</p>
                  <p className="text-3xl font-bold text-blue-600">{recruiterJobs.length}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Your Job Postings</h2>

            {recruiterJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{job.company}</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Location</p>
                        <p className="font-semibold text-gray-800">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Salary</p>
                        <p className="font-semibold text-green-600">₹ {job.salary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Posted</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Last Updated</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(job.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm mb-2">Skills Required:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewApplications(job._id)}
                    className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => handleEditJob(job._id)}
                    className="flex-1 bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
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

export default RecruiterDashboard;
