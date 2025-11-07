import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import { FaBookOpen, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function BorrowedBooks() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/student/borrowed-books/${user.id}`);
        setRows(res.data);
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
    <div className="space-y-6 animate-fade-in w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
          <FaBookOpen className="animate-bounce-slow" />
          My Borrowed Books
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm lg:text-base">Track all your borrowed books and their return dates</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">📚 Book Title</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Borrowed Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Return Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 grid place-content-center text-white">
                        <FaBookOpen />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100">{r.bookId?.title || 'N/A'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{r.bookId?.author || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <FaCalendarAlt className="text-indigo-600" />
                      {new Date(r.borrowDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <FaClock className="text-amber-600" />
                      {r.returnDate ? new Date(r.returnDate).toLocaleDateString() : 'Not set'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                      r.status === 'borrowed' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}>
                      {r.status === 'borrowed' ? <FaClock /> : <FaCheckCircle />}
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rows.map((r, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm grid place-content-center">
                  <FaBookOpen className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{r.bookId?.title || 'N/A'}</h3>
                  <p className="text-xs text-indigo-100 truncate">{r.bookId?.author || ''}</p>
                </div>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-600" />
                  Borrowed:
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(r.borrowDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FaClock className="text-amber-600" />
                  Return:
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {r.returnDate ? new Date(r.returnDate).toLocaleDateString() : 'Not set'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  r.status === 'borrowed' 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  {r.status === 'borrowed' ? <FaClock /> : <FaCheckCircle />}
                  {r.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rows.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">No Borrowed Books</h3>
          <p className="text-gray-600 dark:text-gray-400">You haven't borrowed any books yet.</p>
        </div>
      )}
    </div>
  );
}


