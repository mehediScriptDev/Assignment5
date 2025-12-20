import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const RequireAuth = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Optionally show a spinner; keep simple placeholder
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // If user's role doesn't match, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
