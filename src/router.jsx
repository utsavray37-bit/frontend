import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import Books from './pages/admin/Books.jsx';
import BorrowReturn from './pages/admin/BorrowReturn.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import BorrowedBooks from './pages/student/BorrowedBooks.jsx';
import UpdatePassword from './pages/student/UpdatePassword.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import Gamification from './pages/student/Gamification.jsx';
import Recommendations from './pages/student/Recommendations.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import PublicLayout from './components/PublicLayout.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PublicLayout />,
        children: [
          { path: 'login', element: <StudentLogin /> },
          { path: 'admin/login', element: <AdminLogin /> },
        ],
      },

      {
        path: 'admin',
        element: (
          <ProtectedRoute role="admin">
            <Layout variant="admin" />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'books', element: <Books /> },
          { path: 'borrow-return', element: <BorrowReturn /> },
        ],
      },

      {
        path: 'student',
        element: (
          <ProtectedRoute role="student">
            <Layout variant="student" />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: 'borrowed', element: <BorrowedBooks /> },
          { path: 'password', element: <UpdatePassword /> },
          { path: 'achievements', element: <Gamification /> },
          { path: 'recommendations', element: <Recommendations /> },
        ],
      },
    ],
  },
], { 
  future: { 
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  } 
});


