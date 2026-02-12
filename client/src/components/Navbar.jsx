import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">JobPortal</span>
          </div>

          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Jobs
                </Link>
                {user.role === 'user' && (
                  <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                    My Dashboard
                  </Link>
                )}
                {user.role === 'recruiter' && (
                  <>
                    <Link to="/create-job" className="hover:bg-blue-700 px-3 py-2 rounded">
                      Post Job
                    </Link>
                    <Link to="/recruiter-dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                      My Dashboard
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3 border-l border-blue-700 pl-4 ml-4">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-blue-700 px-3 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
