import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import { FaBook, FaStar, FaFire, FaHeart } from 'react-icons/fa';

export default function Recommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [user]);

  async function loadRecommendations() {
    try {
      const [recRes, trendRes] = await Promise.all([
        api.get(`/student/recommendations/${user.id}?limit=12`),
        api.get('/student/trending?limit=8')
      ]);
      
      setRecommendations(recRes.data);
      setTrending(trendRes.data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
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

  const BookCard = ({ book, isTrending = false }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      {/* Card Header */}
      <div className={`bg-gradient-to-br ${isTrending ? 'from-orange-500 to-red-600' : 'from-indigo-500 to-purple-600'} p-4 text-white relative`}>
        {isTrending && (
          <div className="absolute top-2 right-2">
            <FaFire className="text-yellow-300 text-xl animate-pulse" />
          </div>
        )}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-base sm:text-lg font-bold truncate" title={book.title}>
              {book.title}
            </h4>
            <p className="text-xs sm:text-sm text-indigo-100 truncate" title={book.author}>
              by {book.author}
            </p>
          </div>
          <div className="ml-2">
            <FaBook className="text-xl opacity-80" />
          </div>
        </div>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          {book.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {book.reason && (
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
            <FaHeart className="text-pink-500" />
            <span>{book.reason}</span>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Available:</span>
            <span className={`font-bold ${book.available > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {book.available} / {book.quantity}
            </span>
          </div>

          {book.ratings && book.ratings.count > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Rating:</span>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {book.ratings.average.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">({book.ratings.count})</span>
              </div>
            </div>
          )}

          {isTrending && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Borrows:</span>
              <span className="font-bold text-orange-600">
                {book.totalBorrows}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all font-medium disabled:opacity-50"
          disabled={book.available === 0}
        >
          {book.available > 0 ? 'Reserve Book' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
          <FaBook />
          Recommended for You
        </h1>
        <p className="text-indigo-100 text-xs sm:text-sm lg:text-base">
          Personalized book suggestions based on your reading history
        </p>
      </div>

      {/* Trending Books */}
      {trending.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <FaFire className="text-orange-500" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {trending.map((book) => (
              <BookCard key={book._id} book={book} isTrending={true} />
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <FaStar className="text-yellow-500" />
            Picked Just for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      )}

      {recommendations.length === 0 && trending.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Start Your Reading Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Borrow some books to get personalized recommendations!
          </p>
        </div>
      )}
    </div>
  );
}
