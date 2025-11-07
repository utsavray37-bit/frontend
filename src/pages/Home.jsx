import { Link } from 'react-router-dom';
import { FaBook, FaUserGraduate, FaUserShield, FaChartLine, FaClock, FaLock } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-14 animate-fade-in">
          <div className="inline-block mb-3 sm:mb-4">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4">📚</div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 px-2">
            Library <span className="text-yellow-300">Hub</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Your Modern Library Management System - Smart, Efficient, and Beautiful
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaUserGraduate className="text-xl sm:text-2xl" />
              Student Login
            </Link>
            <Link
              to="/admin/login"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaUserShield className="text-xl sm:text-2xl" />
              Admin Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-6xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-4">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up gpu-accelerated">
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 grid place-content-center mb-3 sm:mb-4">
              <FaBook className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Easy Book Management</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base">
              Add, update, and track your entire library collection with an intuitive interface
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up gpu-accelerated" style={{ animationDelay: '0.1s' }}>
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-lg lg:rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-content-center mb-3 sm:mb-4">
              <FaChartLine className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Real-time Analytics</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base">
              Get instant insights into your library statistics and borrowing patterns
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 grid place-content-center mb-3 sm:mb-4">
              <FaClock className="text-xl sm:text-2xl text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Borrow & Return</h3>
            <p className="text-white/80 text-sm">
              Streamlined process for borrowing and returning books with due date tracking
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 grid place-content-center mb-3 sm:mb-4">
              <FaUserGraduate className="text-xl sm:text-2xl text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Student Portal</h3>
            <p className="text-white/80 text-sm">
              Students can view their borrowed books and manage their account easily
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 grid place-content-center mb-3 sm:mb-4">
              <FaLock className="text-xl sm:text-2xl text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Secure & Safe</h3>
            <p className="text-white/80 text-sm">
              Role-based authentication ensures data security and privacy
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 grid place-content-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🎨</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Beautiful Design</h3>
            <p className="text-white/80 text-sm">
              Fully responsive and attractive UI that works on all devices
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border border-white/20 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center mb-6 sm:mb-8 lg:mb-10">
            Why Choose Library Hub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-300 mb-2">100%</div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base">Free & Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-300 mb-2">∞</div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base">Unlimited Books</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center text-white/80 text-xs sm:text-sm px-4 pb-4">
          <p>© 2025 Library Hub - Built with ❤️ using MERN Stack</p>
        </div>
      </div>
    </div>
  );
}
