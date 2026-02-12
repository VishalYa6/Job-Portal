import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">Access Denied</p>
        <p className="text-gray-600 mb-8">You don't have permission to access this resource.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
