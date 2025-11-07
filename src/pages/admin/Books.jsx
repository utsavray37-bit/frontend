import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaBook, FaSearch } from 'react-icons/fa';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', quantity: 1 });
  const [searchTerm, setSearchTerm] = useState('');

  async function load() {
    const res = await api.get('/admin/books');
    setBooks(res.data);
  }

  useEffect(() => { load(); }, []);

  async function addBook(e) {
    e.preventDefault();
    const payload = { ...form, quantity: Number(form.quantity) };
    const res = await api.post('/admin/add-book', payload);
    toast.success('Book added successfully! 📚');
    setForm({ title: '', author: '', isbn: '', category: '', quantity: 1 });
    setBooks([res.data, ...books]);
  }

  async function removeBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    await api.delete(`/admin/delete-book/${id}`);
    toast.success('Book deleted successfully');
    setBooks(books.filter(b => b._id !== id));
  }

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
              <FaBook />
              Book Management
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm lg:text-base">Add, view, and manage your library collection</p>
          </div>
          <Link 
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-all backdrop-blur-sm shadow-md flex items-center gap-2" 
            to="/admin/borrow-return"
          >
            📖 Borrow/Return
          </Link>
        </div>
      </div>

      {/* Add Book Form */}
      <form onSubmit={addBook} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg w-full overflow-x-hidden">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">➕ Add New Book</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 w-full">
          <input 
            className="input-field col-span-1 sm:col-span-2 lg:col-span-1 w-full" 
            placeholder="Title" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            required
          />
          <input 
            className="input-field w-full" 
            placeholder="Author" 
            value={form.author} 
            onChange={(e) => setForm({ ...form, author: e.target.value })} 
            required
          />
          <input 
            className="input-field w-full" 
            placeholder="ISBN" 
            value={form.isbn} 
            onChange={(e) => setForm({ ...form, isbn: e.target.value })} 
            required
          />
          <input 
            className="input-field w-full" 
            placeholder="Category" 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value })} 
            required
          />
          <input 
            className="input-field w-full" 
            type="number" 
            min="1" 
            placeholder="Quantity" 
            value={form.quantity} 
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
            required
          />
          <button className="btn-primary flex items-center justify-center gap-2 w-full">
            <FaPlus /> Add
          </button>
        </div>
      </form>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title, author, or category..."
            className="w-full pl-10 input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Books Count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          📚 Books Collection ({filteredBooks.length})
        </h3>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {filteredBooks.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
          >
            {/* Card Header with gradient */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold truncate" title={b.title}>
                    {b.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-indigo-100 truncate" title={b.author}>
                    by {b.author}
                  </p>
                </div>
                <div className="ml-2">
                  <FaBook className="text-xl opacity-80" />
                </div>
              </div>
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                {b.category}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-xs break-all">{b.isbn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Qty:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{b.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available:</span>
                  <span className={`font-bold ${
                    b.available > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {b.available}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Availability</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {Math.round((b.available / b.quantity) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                    style={{ width: `${(b.available / b.quantity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Delete Button */}
              <button
                className="w-full mt-3 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center justify-center gap-2 font-medium"
                onClick={() => removeBook(b._id)}
                aria-label={`Delete ${b.title}`}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 dark:text-gray-400">No books found. Add your first book to get started!</p>
        </div>
      )}
    </div>
  );
}


