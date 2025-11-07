import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { FaBook, FaUsers, FaUserShield, FaExchangeAlt, FaChartLine, FaClock, FaCheckCircle } from 'react-icons/fa';

function Card({ icon: Icon, label, value, color, gradient }) {
  return (
    <div className="group rounded-xl lg:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 gpu-accelerated">
      <div className={`bg-gradient-to-br ${gradient} p-4 sm:p-5 lg:p-6 xl:p-8 relative overflow-hidden`}>
        {/* Animated background circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-white/80 text-xs sm:text-sm lg:text-base font-medium mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {label}
            </div>
            <div className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold transition-all duration-300 group-hover:scale-110">
              {value}
            </div>
          </div>
          <div className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 grid place-content-center rounded-2xl bg-white/20 backdrop-blur-sm ${color} shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
            <Icon className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden relative z-10">
          <div className="h-full bg-white/40 rounded-full animate-pulse" style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, students: 0, admins: 0, borrowed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl lg:rounded-2xl p-6 sm:p-7 lg:p-8 xl:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-indigo-100 text-xs sm:text-sm mb-2">
              <FaClock className="animate-pulse" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
              <span className="inline-block animate-bounce">📋</span>
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-indigo-100 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-300" />
              <span>Manage your library with ease</span>
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-5xl lg:text-6xl xl:text-7xl opacity-20 animate-bounce-slow">📚</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 w-full">
        <Card 
          icon={FaBook} 
          label="Total Books" 
          value={stats.books} 
          color="text-indigo-600" 
          gradient="from-indigo-500 to-indigo-600"
        />
        <Card 
          icon={FaUsers} 
          label="Total Students" 
          value={stats.students} 
          color="text-emerald-600" 
          gradient="from-emerald-500 to-emerald-600"
        />
        <Card 
          icon={FaUserShield} 
          label="Total Admins" 
          value={stats.admins} 
          color="text-purple-600" 
          gradient="from-purple-500 to-purple-600"
        />
        <Card 
          icon={FaExchangeAlt} 
          label="Books Borrowed" 
          value={stats.borrowed} 
          color="text-amber-600" 
          gradient="from-amber-500 to-amber-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Library Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 grid place-content-center text-white shadow-lg">
                <FaChartLine className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Quick Stats</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Collection:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{stats.books}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Users:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{stats.students}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Currently Borrowed:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-lg">{stats.borrowed}</span>
            </div>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 grid place-content-center text-white shadow-lg">
                <FaChartLine className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Activity</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Availability Rate:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    style={{ width: `${stats.books > 0 ? ((stats.books - stats.borrowed) / stats.books * 100) : 0}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.books > 0 ? Math.round((stats.books - stats.borrowed) / stats.books * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">System Status</div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-content-center text-white shadow-lg">
              <FaUserShield className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Quick Access</h3>
          </div>
          <div className="space-y-2">
            <a href="#books" className="block p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-900/40 rounded-lg transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manage Books</span>
                <FaBook className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <a href="#borrow" className="block p-3 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700/50 dark:to-purple-900/20 hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/30 dark:hover:to-purple-900/40 rounded-lg transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Borrow/Return</span>
                <FaExchangeAlt className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <a href="#students" className="block p-3 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-700/50 dark:to-emerald-900/20 hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/30 dark:hover:to-emerald-900/40 rounded-lg transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Students</span>
                <FaUsers className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


