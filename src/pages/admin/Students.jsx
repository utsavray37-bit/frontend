import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api.js';
import { FaUserPlus, FaIdCard, FaUser, FaLock } from 'react-icons/fa';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    password: ''
  });

  async function loadStudents() {
    try {
      const res = await api.get('/admin/students');
      setStudents(res.data);
    } catch (error) {
      toast.error('Failed to load students');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/admin/students', formData);
      toast.success(res.data.message);
      setFormData({ name: '', enrollmentNumber: '', password: '' });
      setShowAddForm(false);
      loadStudents();
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to add student';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const res = await api.delete(`/admin/students/${id}`);
      toast.success(res.data.message);
      loadStudents();
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to delete student';
      toast.error(msg);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Student Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Add and manage student accounts
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <FaUserPlus />
          {showAddForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Student</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full input-field"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaIdCard className="inline mr-2" />
                  Enrollment Number
                </label>
                <input
                  type="text"
                  className="w-full input-field"
                  placeholder="STU004"
                  value={formData.enrollmentNumber}
                  onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaLock className="inline mr-2" />
                Password (min 6 characters)
              </label>
              <input
                type="password"
                className="w-full input-field"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </form>
        </div>
      )}

      {/* Students List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">All Students</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Enrollment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Borrowed</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{student.enrollmentNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {student.borrowedBooks?.filter(b => b.status === 'borrowed').length || 0} books
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No students found. Add your first student above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
