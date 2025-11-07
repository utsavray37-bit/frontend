import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('lib_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function saveUser(u) {
    setUser(u);
    if (u) localStorage.setItem('lib_user', JSON.stringify(u));
    else localStorage.removeItem('lib_user');
  }

  async function loginAdmin(email, password) {
    const res = await api.post('/admin/login', { email, password });
    saveUser(res.data.user);
    toast.success('Logged in as admin');
  }

  async function loginStudent(enrollmentNumber, password) {
    const res = await api.post('/student/login', { enrollmentNumber, password });
    saveUser(res.data.user);
    toast.success('Logged in as student');
  }

  async function logout() {
    try { await api.post('/logout'); } catch {}
    saveUser(null);
  }

  const value = { user, loginAdmin, loginStudent, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


