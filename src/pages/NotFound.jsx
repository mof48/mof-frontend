import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-black text-white font-playfair">
      <Navbar />

      <video
        className="absolute w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/luxury-loop.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/60 backdrop-blur-sm px-6 pt-24 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold text-gold drop-shadow-lg"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-xl text-rose-200"
        >
          Page not found. Redirecting you to login...
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
