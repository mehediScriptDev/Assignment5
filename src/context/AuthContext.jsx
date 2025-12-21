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
      if (res.data && res.data.success) {
        let userData = res.data.data || null;
        
        // If user is a company, fetch company profile data
        if (userData && userData.role === 'COMPANY') {
          try {
            const companyRes = await client.get('/companies/profile');
            if (companyRes.data && companyRes.data.success) {
              userData = { ...userData, company: companyRes.data.data };
            }
          } catch (companyErr) {
            console.error('Failed to load company data', companyErr);
          }
        }
        
        setUser(userData);
      }
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

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const res = await client.get('/auth/me');
      if (res.data && res.data.success) {
        let userData = res.data.data || null;
        
        // If user is a company, fetch company profile data
        if (userData && userData.role === 'COMPANY') {
          try {
            const companyRes = await client.get('/companies/profile');
            if (companyRes.data && companyRes.data.success) {
              userData = { ...userData, company: companyRes.data.data };
            }
          } catch (companyErr) {
            console.error('Failed to load company data', companyErr);
          }
        }
        
        setUser(userData);
      }
    } catch (err) {
      console.error('Failed to refresh user', err?.message || err);
    }
  };

  const login = async (payload) => {
    if (!payload) return;
    if (payload.token) localStorage.setItem('token', payload.token);
    if (payload.data) setUser(payload.data);
    // Fetch complete user data including profile picture
    await refreshUser();
  };

  const register = async (payload) => {
    if (!payload) return;
    if (payload.token) localStorage.setItem('token', payload.token);
    if (payload.data) setUser(payload.data);
    // Fetch complete user data including profile picture
    await refreshUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (userData) => {
    if (!userData) return;
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
