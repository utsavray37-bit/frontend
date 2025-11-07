import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaUserGraduate, FaIdCard, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function StudentLogin() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('STU001');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginStudent(enrollmentNumber, password);
      navigate('/student');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-3xl mb-4 shadow-lg">
              <FaUserGraduate />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Student Portal</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Access your library account</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaIdCard className="inline mr-2" />
                Enrollment Number
              </label>
              <input 
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
                Password
              </label>
              <input 
                className="w-full input-field" 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              disabled={loading} 
              className="w-full btn-secondary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaSignInAlt />
                  Login as Student
                </span>
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Demo credentials are pre-filled</p>
          </div>
        </div>
      </div>
    </div>
  );
}


