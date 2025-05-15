import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

function GuestDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

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
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen bg-black/70 backdrop-blur-sm px-4 pt-32">
        <img
          src="/images/Elite Women.png"
          alt="Elite Women Logo"
          className="w-32 mb-6 drop-shadow-lg"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gold text-center mb-2"
        >
          🌼 Welcome, {user?.name || 'Guest'}!
        </motion.h1>

        <p className="text-pink-200 text-center max-w-xl mb-10">
          You're in the preview suite of the Elite Women Network. Enjoy early access to community insights and empowerment tools.
        </p>

        {/* Guest Access List */}
        <div className="bg-white/10 border border-gold rounded-lg p-6 mb-10 w-full max-w-2xl text-sm md:text-base">
          <h2 className="text-xl font-semibold text-gold mb-4">✨ As a Guest, You Can:</h2>
          <ul className="list-disc list-inside text-rose-200 space-y-1">
            <li>💌 Read select newsletters and updates</li>
            <li>🎓 Preview course outlines and mentorship paths</li>
            <li>💬 Join public forums and Q&A sessions</li>
          </ul>
        </div>

        {/* Upgrade Box */}
        <div className="bg-gold/10 border border-gold rounded-lg p-6 text-center max-w-xl w-full">
          <h3 className="text-lg font-bold text-gold mb-2">🌟 Ready to Unlock the Full Experience?</h3>
          <p className="text-white mb-4">Upgrade to a member tier and access luxury dashboards, elite events, and premium mentorship.</p>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-gold text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition"
          >
            Upgrade My Account
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="mt-10 text-sm text-white underline hover:text-gold"
        >
          Logout
        </button>

        {/* Footer */}
        <footer className="mt-16 text-xs text-gray-500 border-t border-gold pt-4 w-full text-center">
          &copy; 2025 MOF Women Network. Empowerment Begins Here.
        </footer>
      </div>
    </div>
  );
}

export default GuestDashboard;
