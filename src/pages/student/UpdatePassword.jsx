import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import { toast } from 'react-toastify';
import { FaSave, FaLock, FaKey } from 'react-icons/fa';

export default function UpdatePassword() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await api.put(`/student/update-password/${user.id}`, { password });
      toast.success('✅ Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in w-full overflow-x-hidden px-4 sm:px-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-center gap-3">
          <FaLock />
          Update Password
        </h1>
        <p className="text-purple-100 text-xs sm:text-sm lg:text-base">Keep your account secure with a strong password</p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <form onSubmit={submit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaKey className="inline mr-2 text-indigo-600" />
              New Password
            </label>
            <input 
              className="w-full input-field" 
              type="password" 
              placeholder="Enter new password (min. 6 characters)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaKey className="inline mr-2 text-purple-600" />
              Confirm Password
            </label>
            <input 
              className="w-full input-field" 
              type="password" 
              placeholder="Re-enter your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    password.length < 6 ? 'bg-red-500 w-1/4' :
                    password.length < 8 ? 'bg-yellow-500 w-2/4' :
                    password.length < 12 ? 'bg-blue-500 w-3/4' :
                    'bg-emerald-500 w-full'
                  }`}
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {password.length < 6 && 'Weak - Use at least 6 characters'}
                {password.length >= 6 && password.length < 8 && 'Fair - Consider using more characters'}
                {password.length >= 8 && password.length < 12 && 'Good - Strong password'}
                {password.length >= 12 && 'Excellent - Very strong password'}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            disabled={loading || !password || !confirmPassword} 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaSave /> Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Security Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
        <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          🔒 Password Security Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600">✓</span>
            <span>Use at least 8 characters with a mix of letters, numbers, and symbols</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600">✓</span>
            <span>Avoid using personal information like your name or birthdate</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600">✓</span>
            <span>Don't reuse passwords from other accounts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600">✓</span>
            <span>Update your password regularly for better security</span>
          </li>
        </ul>
      </div>
    </div>
  );
}


