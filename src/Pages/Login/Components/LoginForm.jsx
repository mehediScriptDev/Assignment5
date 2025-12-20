import React, { useState, useContext } from "react";
import Email from "./Email";
import Password from "./Password";
import client from '../../../api/client';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.debug('Login payload:', { email, role });
      const res = await client.post('/auth/login', { email, password, role });
      if (res.data && res.data.success) {
        auth.login(res.data);
        // Redirect users to their respective dashboards after login
        const userRole = (res.data.data && res.data.data.role) || role;
        if (userRole === 'COMPANY') {
          navigate('/company/dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert(res.data?.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Login response:', err?.response?.data);
      alert(err?.response?.data?.message || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted-foreground">I am</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="input w-40 text-sm">
            <option value="USER">Job Seeker</option>
            <option value="COMPANY">Employer</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <i data-lucide="mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <i data-lucide="lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"></i>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="input pl-10 pr-10"
              placeholder="Your password"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={(e) => window.togglePassword && window.togglePassword(e)} data-toggle-for="password">
              <i data-lucide="eye" className="h-4 w-4"></i>
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full text-base h-11">
          <i data-lucide="log-in" className="h-4 w-4 mr-2"></i>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
