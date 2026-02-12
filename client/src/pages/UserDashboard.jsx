import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDashboard } from '../store/applicationSlice';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userApplications, isLoading } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Track your job applications and statuses here.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading applications...</p>
          </div>
        ) : userApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't applied for any jobs yet.</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Applications ({userApplications.length})</h2>
            {userApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{application.job?.title}</h3>
                    <p className="text-blue-600 font-semibold">{application.job?.company}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Location</p>
                    <p className="font-semibold text-gray-800">{application.job?.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Salary</p>
                    <p className="font-semibold text-green-600">₹ {application.job?.salary?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Applied On</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {application.job?.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{application.job.description}</p>
                )}

                {application.job?.skills && application.job.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {application.job.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
