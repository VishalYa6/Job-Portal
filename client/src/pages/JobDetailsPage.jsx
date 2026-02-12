import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../store/jobSlice';
import { applyForJobAction } from '../store/applicationSlice';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedJob, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const { error: appError } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchJobById(jobId));
  }, [jobId, dispatch]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'recruiter') {
      alert('Recruiters cannot apply for jobs');
      return;
    }

    const result = await dispatch(applyForJobAction(jobId));
    if (result.payload?.application) {
      alert('Application submitted successfully!');
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!selectedJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Job not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedJob.title}</h1>
            <p className="text-2xl text-blue-600 font-semibold">{selectedJob.company}</p>

            {selectedJob.recruiter && (
              <p className="text-gray-600 mt-2">
                Posted by: <span className="font-semibold">{selectedJob.recruiter.name}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-100 rounded-lg">
            <div>
              <p className="text-Gray-600 text-sm font-semibold uppercase">Location</p>
              <p className="text-lg font-semibold text-gray-800">{selectedJob.location}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold uppercase">Salary</p>
              <p className="text-lg font-semibold text-green-600">₹ {selectedJob.salary.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold uppercase">Posted</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(selectedJob.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
          </div>

          {selectedJob.skills && selectedJob.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {selectedJob.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {appError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {appError}
            </div>
          )}

          {user && user.role === 'recruiter' ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg">
              <p>Recruiters cannot apply for jobs. You can manage your job postings from your dashboard.</p>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition text-lg"
            >
              {user ? 'Apply Now' : 'Login to Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
