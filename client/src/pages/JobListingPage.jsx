import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllJobs } from '../store/jobSlice';

const JobListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ search: '', location: '', salary: '' });

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.salary) {
      const minSalary = parseInt(filters.salary);
      filtered = filtered.filter((job) => job.salary >= minSalary);
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleViewDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Job Opportunities</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by title, company, or keyword"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Filter by location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min salary"
              value={filters.salary}
              onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{filteredJobs.length} jobs found</p>
        </div>

        {/* Job Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No jobs found matching your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition hover:scale-105 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-blue-600 font-semibold mb-2">{job.company}</p>
                <p className="text-gray-600 mb-3 text-sm line-clamp-3">{job.description}</p>

                <div className="mb-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Location:</span> {job.location}
                  </p>
                  <p className="text-green-600 font-semibold">₹ {job.salary.toLocaleString()}</p>
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 text-sm mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-gray-600 text-xs">+{job.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleViewDetails(job._id)}
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;
