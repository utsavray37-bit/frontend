import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <NavBar />
      <main className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}


