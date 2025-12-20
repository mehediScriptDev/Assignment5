import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';

const Header = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2">
              <i data-lucide="briefcase" className="h-8 w-8 text-primary"></i>
              <span className="text-xl font-bold">LWS Job Portal</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {(() => {
              const auth = useContext(AuthContext);
              const navigate = useNavigate();
              if (auth && auth.user) {
                const role = auth.user.role;
                return (
                  <>
                    {role === 'COMPANY' ? (
                      <>
                        <Link to="/company/create-job" className="btn btn-primary text-sm">Post a Job</Link>
                        <Link to="/company/dashboard" className="btn btn-ghost text-sm">Dashboard</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/user-dashboard" className="btn btn-ghost text-sm">Dashboard</Link>
                      </>
                    )}
                    <button onClick={() => { auth.logout(); navigate('/'); }} className="btn btn-ghost text-sm">Sign Out</button>
                  </>
                );
              }

              return (
                <>
                  <Link to="/login" className="btn btn-ghost text-sm">Sign In</Link>
                  <Link to="/register-company" className="btn btn-primary text-sm">Post a Job</Link>
                </>
              );
            })()}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
