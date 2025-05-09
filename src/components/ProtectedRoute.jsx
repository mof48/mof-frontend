import { Navigate } from 'react-router-dom';

// Example: Replace this with your real auth check
const isAuthenticated = () => {
  // Simulate login (replace with token or user check)
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
