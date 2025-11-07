import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { toast } from 'react-toastify';
import { FaExchangeAlt, FaUndo, FaUserGraduate, FaBook } from 'react-icons/fa';

export default function BorrowReturn() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ enrollmentNumber: '', isbn: '', returnDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, b] = await Promise.all([
        api.get('/admin/students'),
        api.get('/admin/books'),
      ]);
      setStudents(s.data);
      setBooks(b.data);
    })();
  }, []);

  async function borrow(e) {
    e.preventDefault();
    if (!form.enrollmentNumber || !form.isbn || !form.returnDate) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await api.post('/admin/borrow-book', form);
      toast.success('🎉 Book borrowed successfully!');
      setForm({ enrollmentNumber: '', isbn: '', returnDate: '' });
      // Refresh books to update availability
      const b = await api.get('/admin/books');
      setBooks(b.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to borrow book');
    } finally {
      setLoading(false);
    }
  }

  async function returnBook(e) {
    e.preventDefault();
    if (!form.enrollmentNumber || !form.isbn) {
      toast.error('Please select student and book');
      return;
    }
    setLoading(true);
    try {
      await api.post('/admin/return-book', { enrollmentNumber: form.enrollmentNumber, isbn: form.isbn });
      toast.success('✅ Book returned successfully!');
      setForm({ enrollmentNumber: '', isbn: '', returnDate: '' });
      // Refresh books to update availability
      const b = await api.get('/admin/books');
      setBooks(b.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to return book');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
          <FaExchangeAlt className="animate-pulse" />
          Borrow / Return Management
        </h1>
        <p className="text-emerald-100 text-xs sm:text-sm lg:text-base">Process book borrowing and returns</p>
      </div>

      {/* Main Form */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg w-full">
        <form className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaUserGraduate className="inline mr-2 text-indigo-600" />
                Select Student
              </label>
              <select 
                className="w-full input-field" 
                value={form.enrollmentNumber} 
                onChange={(e) => setForm({ ...form, enrollmentNumber: e.target.value })}
              >
                <option value="">Choose a student...</option>
                {students.map(s => (
                  <option key={s._id} value={s.enrollmentNumber}>
                    {s.name} ({s.enrollmentNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Book Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaBook className="inline mr-2 text-purple-600" />
                Select Book
              </label>
              <select 
                className="w-full input-field" 
                value={form.isbn} 
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
              >
                <option value="">Choose a book...</option>
                {books.map(b => (
                  <option key={b._id} value={b.isbn} disabled={b.available === 0}>
                    {b.title} ({b.available}/{b.quantity} available)
                  </option>
                ))}
              </select>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📅 Return Date
              </label>
              <input 
                className="w-full input-field" 
                type="date" 
                value={form.returnDate} 
                onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button"
              onClick={borrow} 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <FaExchangeAlt className={loading ? 'animate-spin' : ''} /> 
              {loading ? 'Processing...' : 'Borrow Book'}
            </button>
            
            <button 
              type="button"
              onClick={returnBook} 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <FaUndo className={loading ? 'animate-spin' : ''} /> 
              {loading ? 'Processing...' : 'Return Book'}
            </button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            📊 Total Students
          </h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{students.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Registered in the system</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border border-purple-100 dark:border-gray-600">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            📚 Total Books
          </h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{books.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Available in the library</p>
        </div>
      </div>
    </div>
  );
}


