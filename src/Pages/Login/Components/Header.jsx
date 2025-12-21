import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { FiBriefcase } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const user = auth && auth.user;
  const name = user?.name || 'User';

  const handleLogout = () => {
    if (auth && typeof auth.logout === 'function') auth.logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <FiBriefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">LWS Job Portal</span>
          </Link>

          {user && (
            <nav className="hidden sm:flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Jobs</NavLink>
              <NavLink to="/user-dashboard" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Dashboard</NavLink>
              <NavLink to="/applied-jobs" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>My Applications</NavLink>
            </nav>
          )}
        </div>

        {/* Spacer to push avatar to right end */}
        <div className="flex-1" />

        {/* Right: avatar / auth actions */}
        <div className="flex items-center justify-end gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-primary" aria-label="Sign out">Sign Out</button>
              <div className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-sm text-muted-foreground">
                <FaUser className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm hidden sm:inline text-muted-foreground">{name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">Sign In</Link>
              <Link to="/register-company" className="btn btn-primary text-sm">Post a Job</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
