import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-xl font-bold">
              CalTrack
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Dashboard
              </Link>
              <Link
                to="/foods"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Foods
              </Link>
              <Link
                to="/goals"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Goals
              </Link>
              <Link
                to="/profile"
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Hello, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};




