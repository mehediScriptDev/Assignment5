import React, { createContext, useEffect, useState } from 'react';
import client from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await client.get('/auth/me');
      if (res.data && res.data.success) setUser(res.data.data || null);
    } catch (err) {
      console.error('Failed to load user', err?.message || err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (payload) => {
    if (!payload) return;
    if (payload.token) localStorage.setItem('token', payload.token);
    if (payload.data) setUser(payload.data);
  };

  const register = (payload) => {
    if (!payload) return;
    if (payload.token) localStorage.setItem('token', payload.token);
    if (payload.data) setUser(payload.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
