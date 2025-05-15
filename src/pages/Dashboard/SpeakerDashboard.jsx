import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

function SpeakerDashboard() {
  return (
    <div className="relative min-h-screen text-white font-sans bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Background video */}
      <video
        className="absolute w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/luxury-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/60 backdrop-blur-sm px-4 pt-24">
        <img
          src="/images/Elite Women.png"
          alt="Elite Women Logo"
          className="w-40 mb-6 drop-shadow-lg"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gold text-center"
        >
          Welcome to the Speaker Dashboard
        </motion.h1>

        <p className="text-pink-300 mt-4 text-center">
          Luxury, grace, and powerful tools await.
        </p>
      </div>
    </div>
  );
}

export default SpeakerDashboard;
