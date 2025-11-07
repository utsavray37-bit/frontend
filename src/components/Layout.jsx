import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import NavBar from './NavBar.jsx';

export default function Layout({ variant = 'admin' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col overflow-x-hidden">
      <NavBar onMenuClick={() => setMobileOpen(true)} />
      
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar variant={variant} />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in lg:hidden" 
              onClick={() => setMobileOpen(false)} 
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-72 sm:w-80 z-50 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto">
              <button
                className="absolute right-3 top-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-md z-10"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Sidebar variant={variant} />
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 w-full overflow-auto">
          <div className="w-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


