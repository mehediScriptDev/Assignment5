import React, { useContext } from "react";
import { FiBriefcase, FiPlus } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${path}`;
};

const Header = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center space-x-2">
              <FiBriefcase className="h-8 w-8 text-primary" />
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
                                  <nav className="hidden md:flex items-center gap-6 mr-4">
                                    <Link to="/company/dashboard" className="text-sm font-medium text-[hsl(var(--color-primary))]">Dashboard</Link>
                                    <Link to="/company/manage-jobs" className="text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))]">Manage Jobs</Link>
                                    <Link to="/company/applicants" className="text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))]">Applicants</Link>
                                  </nav>

                                  <div className="flex items-center gap-3">
                                    <Link to="/company/create-job" className="btn btn-primary text-sm flex items-center gap-2">
                                      <FiPlus className="h-4 w-4" />
                                      Post Job
                                    </Link>

                                    <button onClick={() => { auth.logout(); navigate('/'); }} className="btn btn-primary text-sm cursor-pointer" style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}>Sign Out</button>

                                    <div className="flex items-center gap-3 ml-2">
                                        <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border border-[hsl(var(--color-border))] overflow-hidden">
                                          {(() => {
                                            console.log('Company logoUrl:', auth.user.company?.logoUrl);
                                            console.log('Full company data:', auth.user.company);
                                            return auth.user.company?.logoUrl ? (
                                              <img src={getFileUrl(auth.user.company.logoUrl)} alt={auth.user.company?.name || 'Company'} className="h-full w-full object-cover" />
                                            ) : (
                                              <BiBuilding className="h-5 w-5 text-black" />
                                            );
                                          })()}
                                        </div>
                                        <span className="text-sm font-medium hidden md:inline text-black">{auth.user.company?.name || auth.user.name || 'Company'}</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-3">
                                    <Link to="/user-dashboard" className="btn btn-ghost text-sm">Dashboard</Link>
                                    <button onClick={() => { auth.logout(); navigate('/'); }} className="btn btn-primary text-sm cursor-pointer" style={{ background: '#fff8e1', borderColor: '#fff8e1', color: '#111827' }}>Sign Out</button>

                                    <div className="flex items-center gap-3 ml-2">
                                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center border border-[hsl(var(--color-border))] overflow-hidden">
                                        {(() => {
                                          console.log('User profilePictureUrl:', auth.user.profilePictureUrl);
                                          return auth.user.profilePictureUrl ? (
                                            <img src={getFileUrl(auth.user.profilePictureUrl)} alt={auth.user.name || 'User'} className="h-full w-full object-cover" />
                                          ) : (
                                            <FaUser className="h-5 w-5 text-black" />
                                          );
                                        })()}
                                      </div>
                                      <span className="text-sm font-medium hidden md:inline text-black">{auth.user.name || 'User'}</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          );
              }

              return (
                <>
                  <Link to="/login" className="btn btn-ghost text-sm cursor-pointer">Sign In</Link>
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
