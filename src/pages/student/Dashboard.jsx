import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import { FaBook, FaListOl, FaChartLine, FaTrophy, FaFire, FaStar, FaArrowRight, FaClock, FaCheckCircle } from 'react-icons/fa';

function Card({ icon: Icon, label, value, gradient, description }) {
  return (
    <div className="group rounded-xl lg:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 gpu-accelerated">
      <div className={`bg-gradient-to-br ${gradient} p-5 sm:p-6 lg:p-8 xl:p-10 relative overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-white/80 text-xs sm:text-sm lg:text-base font-medium mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {label}
            </div>
            <div className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 transition-all duration-300 group-hover:scale-110">{value}</div>
            <div className="text-white/70 text-xs lg:text-sm flex items-center gap-1">
              <FaCheckCircle className="text-xs" />
              {description}
            </div>
          </div>
          <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 grid place-content-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Icon className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white" />
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden relative z-10">
          <div className="h-full bg-white/40 rounded-full transition-all duration-1000" style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ borrowed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/student/stats/${user.id}`);
        setStats(res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full overflow-x-hidden">
      {/* Welcome Header with enhanced design */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-emerald-100 text-xs sm:text-sm mb-2">
              <FaClock className="animate-pulse" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
              <span className="inline-block animate-bounce">🎓</span>
              Welcome back, {user.name}!
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm lg:text-base flex items-center gap-2">
              <span>Your reading journey continues...</span>
              <FaStar className="text-yellow-300 animate-pulse" />
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-5xl lg:text-6xl xl:text-7xl opacity-20 animate-bounce-slow">📚</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        <Card 
          icon={FaBook} 
          label="Currently Borrowed" 
          value={stats.borrowed} 
          gradient="from-amber-500 to-orange-600"
          description="Books in your possession"
        />
        <Card 
          icon={FaListOl} 
          label="Total Borrowed" 
          value={stats.total} 
          gradient="from-indigo-500 to-purple-600"
          description="All-time borrowing count"
        />
        <Card 
          icon={FaTrophy} 
          label="Achievement Points" 
          value={stats.points || 0} 
          gradient="from-yellow-500 to-orange-500"
          description={`Level ${stats.level || 1}`}
        />
        <Card 
          icon={FaFire} 
          label="Reading Streak" 
          value={stats.streak?.current || 0} 
          gradient="from-red-500 to-pink-600"
          description="Days in a row"
        />
      </div>

      {/* Quick Info Cards with enhanced interactivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recommendations Card */}
        <Link to="/student/recommendations" className="group block">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 grid place-content-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaStar className="text-xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Recommendations</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              Discover your next favorite book with AI-powered suggestions tailored just for you
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
              <span>Explore Books</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Achievements Card */}
        <Link to="/student/achievements" className="group block">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 grid place-content-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaTrophy className="text-xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Achievements</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              Track your progress, earn badges, and compete on the leaderboard
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                <span>View Stats</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
              {stats.badges && stats.badges.length > 0 && (
                <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                  <FaTrophy className="text-xs text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{stats.badges.length}</span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Reading Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-content-center text-white shadow-lg">
              <FaChartLine className="text-xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Reading Stats</h3>
          </div>
          <div className="space-y-3">
            {stats.favoriteGenres && stats.favoriteGenres.length > 0 ? (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Favorite Genre</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-semibold">
                    {stats.favoriteGenres[0]?.genre}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    ({stats.favoriteGenres[0]?.count} books)
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">Start reading to discover your favorites!</p>
            )}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Books Completed</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.readingStats?.totalBooksRead || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


