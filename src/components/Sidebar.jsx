import { NavLink } from 'react-router-dom';
import { FaBook, FaExchangeAlt, FaHome, FaKey, FaListUl, FaUserGraduate, FaTachometerAlt, FaTrophy, FaStar, FaUsers } from 'react-icons/fa';

function Item({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-700 hover:shadow-md'
        }`
      }
      end
    >
      <Icon className="text-lg transition-transform duration-200 group-hover:scale-110" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}

export default function Sidebar({ variant = 'admin' }) {
  return (
    <aside className="w-64 lg:w-72 xl:w-80 2xl:w-96 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Logo Section */}
      <div className="mb-8 flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
        <div className="h-11 w-11 grid place-content-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl shadow-lg">
          📚
        </div>
        <div>
          <div className="font-bold text-lg leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Library Hub</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {variant === 'admin' ? '👨‍💼 Admin Panel' : '🎓 Student Portal'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      {variant === 'admin' ? (
        <nav className="space-y-2">
          <Item to="/admin" icon={FaTachometerAlt} label="Dashboard" />
          <Item to="/admin/books" icon={FaListUl} label="Books" />
          <Item to="/admin/borrow-return" icon={FaExchangeAlt} label="Borrow / Return" />
          <Item to="/admin/students" icon={FaUsers} label="Students" />
        </nav>
      ) : (
        <nav className="space-y-2">
          <Item to="/student" icon={FaTachometerAlt} label="Dashboard" />
          <Item to="/student/borrowed" icon={FaBook} label="My Borrowed" />
          <Item to="/student/recommendations" icon={FaStar} label="Recommendations" />
          <Item to="/student/achievements" icon={FaTrophy} label="Achievements" />
          <Item to="/student/password" icon={FaKey} label="Password" />
        </nav>
      )}

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 border border-indigo-100 dark:border-gray-600">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <FaUserGraduate className="text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium">Library Management System</span>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Powered by MERN Stack
          </div>
        </div>
      </div>
    </aside>
  );
}


