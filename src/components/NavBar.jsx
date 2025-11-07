import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FaSignOutAlt, FaUserShield, FaUserGraduate, FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

export default function NavBar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl sticky top-0 z-30">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <FaBars className="text-lg" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-lg lg:text-xl xl:text-2xl">
              <span className="inline-grid place-content-center h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 xl:h-12 xl:w-12 rounded-lg bg-white/20 text-xl sm:text-2xl lg:text-3xl backdrop-blur-sm shadow-lg">📚</span>
              <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Library Hub</span>
              <span className="sm:hidden">Library Hub</span>
            </Link>
          </div>
          
          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center gap-2 text-sm backdrop-blur-sm shadow-md"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-200" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            
            {user ? (
              <>
                <span className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 text-sm backdrop-blur-sm shadow-md">
                  {user.role === 'admin' ? <FaUserShield className="text-yellow-300" /> : <FaUserGraduate className="text-blue-200" />}
                  <span className="font-medium">{user.name}</span>
                </span>
                <button
                  className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition-all duration-200 flex items-center gap-2 text-sm font-medium backdrop-blur-sm shadow-md hover:shadow-lg"
                  onClick={() => { logout(); navigate('/'); }}
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/admin/login" className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-md">Admin</Link>
                <Link to="/login" className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-md">Student</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


