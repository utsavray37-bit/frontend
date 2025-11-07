import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api.js';
import { FaUserGraduate, FaIdCard, FaLock, FaArrowLeft } from 'react-icons/fa';

export default function StudentForgotPassword() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post('/student/reset-password', { enrollmentNumber, newPassword });
      toast.success(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const msg = error?.response?.data?.message || 'Password reset failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-3xl mb-4 shadow-lg">
              <FaUserGraduate />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Reset Student Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your enrollment number and new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaIdCard className="inline mr-2" />
                Enrollment Number
              </label>
              <input
                type="text"
                className="w-full input-field"
                placeholder="STU001"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaLock className="inline mr-2" />
                New Password
              </label>
              <input
                type="password"
                className="w-full input-field"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaLock className="inline mr-2" />
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full input-field"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-secondary py-3 text-base font-semibold disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
