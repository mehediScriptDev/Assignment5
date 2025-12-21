import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const HomeGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && user.role === 'COMPANY') {
      navigate('/company/dashboard');
    }
  }, [user, loading, navigate]);

  // Don't render home page content if user is a company
  if (!loading && user && user.role === 'COMPANY') {
    return null;
  }

  return children;
};

export default HomeGuard;
