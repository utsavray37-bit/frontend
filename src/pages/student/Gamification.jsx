import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import { FaTrophy, FaMedal, FaFire, FaStar, FaChartLine, FaAward } from 'react-icons/fa';

export default function Gamification() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [badgesInfo, setBadgesInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  async function loadData() {
    try {
      const [statsRes, leaderboardRes, badgesRes] = await Promise.all([
        api.get(`/student/stats/${user.id}`),
        api.get('/student/leaderboard?limit=10'),
        api.get('/student/badges')
      ]);
      
      setStats(statsRes.data);
      setLeaderboard(leaderboardRes.data);
      setBadgesInfo(badgesRes.data);
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const levelProgress = stats ? ((stats.points % 100) / 100) * 100 : 0;
  const nextLevelPoints = (stats?.level || 1) * 100;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
          <FaTrophy className="text-yellow-300" />
          Your Achievements
        </h1>
        <p className="text-purple-100 text-xs sm:text-sm lg:text-base">
          Track your reading journey and compete with others!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Points Card */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FaStar className="text-3xl" />
            <div className="text-right">
              <div className="text-sm opacity-90">Total Points</div>
              <div className="text-4xl font-bold">{stats?.points || 0}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Level {stats?.level || 1}</span>
              <span>{nextLevelPoints} pts</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <FaFire className="text-3xl" />
            <div className="text-right">
              <div className="text-sm opacity-90">Current Streak</div>
              <div className="text-4xl font-bold">{stats?.streak?.current || 0}</div>
              <div className="text-xs opacity-75 mt-1">
                Best: {stats?.streak?.longest || 0} days
              </div>
            </div>
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <FaMedal className="text-3xl" />
            <div className="text-right">
              <div className="text-sm opacity-90">Badges Earned</div>
              <div className="text-4xl font-bold">{stats?.badges?.length || 0}</div>
              <div className="text-xs opacity-75 mt-1">
                {Object.keys(badgesInfo).length} total available
              </div>
            </div>
          </div>
        </div>

        {/* Books Read Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <FaChartLine className="text-3xl" />
            <div className="text-right">
              <div className="text-sm opacity-90">Books Read</div>
              <div className="text-4xl font-bold">{stats?.readingStats?.totalBooksRead || 0}</div>
              <div className="text-xs opacity-75 mt-1">
                This month: {stats?.readingStats?.booksThisMonth || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaAward className="text-yellow-500" />
          Your Badges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(badgesInfo).map(([key, badge]) => {
            const earned = stats?.badges?.includes(key);
            return (
              <div
                key={key}
                className={`p-4 rounded-xl border-2 transition-all ${
                  earned
                    ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mb-2">{earned ? badge.name.split(' ')[0] : '🔒'}</div>
                <div className="font-semibold text-sm">{badge.name.split(' ').slice(1).join(' ')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {badge.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Top Readers
        </h2>
        <div className="space-y-3">
          {leaderboard.map((leader, index) => {
            const isCurrentUser = leader.enrollmentNumber === user.enrollmentNumber;
            return (
              <div
                key={leader.enrollmentNumber}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-500'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">
                    {leader.name}
                    {isCurrentUser && <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">You</span>}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {leader.booksRead} books • {leader.badges} badges • Level {leader.level}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {leader.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
