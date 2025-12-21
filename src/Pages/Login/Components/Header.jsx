import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { FiBriefcase, FiFilePlus, FiPlus } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
              {user.role === 'COMPANY' ? (
                <>
                  <NavLink to="/company/dashboard" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Dashboard</NavLink>
                  <NavLink to="/company/manage-jobs" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Manage Jobs</NavLink>
                  <NavLink to="/company/applicants" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Applicants</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Jobs</NavLink>
                  <NavLink to="/user-dashboard" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>Dashboard</NavLink>
                  <NavLink to="/applied-jobs" className={({ isActive }) => `text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary`}>My Applications</NavLink>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Spacer to push avatar to right end */}
        <div className="flex-1" />

        {/* Right: avatar / auth actions */}
        <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-3">
            {!(user && user.role === 'USER') && (
              <Link to="/company/create-job" className="btn btn-primary text-sm flex items-center gap-2">
               <FiFilePlus className="h-4 w-4" />
                Post Job
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className="btn btn-primary text-sm cursor-pointer" style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}>Sign Out</button>
            ) : (
              <Link to="/login" className="btn btn-ghost text-sm cursor-pointer">Sign In</Link>
            )}

            {user && (
              <div className="flex items-center gap-3 ml-2">
                <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border border-[hsl(var(--color-border))]">
                  {user?.role === 'COMPANY' ? (
                    <BiBuilding className="h-5 w-5 text-black" />
                  ) : (
                    <FaUser className="h-5 w-5 text-black" />
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline text-black">{name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
