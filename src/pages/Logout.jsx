import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: slight delay before redirecting
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-950 text-white text-center px-4">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-gold">You’ve Been Logged Out</h1>
        <p className="text-pink-300 text-lg">Redirecting you to the login page...</p>
        <div className="loader mt-6 mx-auto border-t-4 border-gold border-solid rounded-full w-10 h-10 animate-spin"></div>
      </div>
    </div>
  );
};

export default Logout;
